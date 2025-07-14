import { Component, Input, OnInit,ViewChild,ViewEncapsulation  } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartResponseDTO } from 'src/app/interface/cart-response-dto';
import { CartItemResponseDTO } from 'src/app/interface/cart-item-response-dto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { OrderRequestDTO } from 'src/app/interface/order-request-dto';
import { CouponResponseDTO } from 'src/app/interface/coupon-response-dto';
import { CouponService } from 'src/app/services/coupon.service';
import { UserAddressService } from 'src/app/services/user-address.service';
import { UserAddressResponseDTO } from 'src/app/interface/user-address-response-dto';
import { ProgressDialogComponent } from '../layout/progress-dialog/progress-dialog.component';
import { AddAddressDialogComponent } from 'src/app/user/components/add-address-dialog/add-address-dialog.component';

@Component({
  selector: 'app-checkout',
    standalone:true,
      imports:[
            HeaderComponent,
            FooterComponent,
            CarouselModule,
            CommonModule,
            MaterialModule,
            FormsModule,
            MatDialogModule,
            ReactiveFormsModule,
          ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  encapsulation: ViewEncapsulation.Emulated, // This is the default (styles scoped to this component only)
  animations: [
    
  ]
  
})
export class CheckoutComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  cartFormGroup: FormGroup;
  billingFormGroup: FormGroup;

  cartItems: CartItemResponseDTO[] = [];
  cartId!: number;
  userId: string =  '49d2554d-61a3-4bc9-b6ee-26046ab29254'; // Replace with real user ID from auth service
  couponCode : string;
  appliedCoupon: CouponResponseDTO | null = null;

  deliveryOption: string = 'standard'; // Default: 2-3 days, 0 MAD
  paymentMethod: string = 'cod'; // Default: Cash on delivery
  subTotal = 0;
  discount = 0;
  totalAfterDiscount = 0;
  finalTotal: number = 0;



  allProducts: { productId: string; imageUrl: string | null }[] = [];
  readonly backendUrl = 'http://localhost:8200';

  addresses : UserAddressResponseDTO[] = [];
  selectedAddress: number | null = null;


  cartCompleted = false;
  billingCompleted = false;
  paymentCompleted = false;

  orderId: string = this.generateOrderId();

  constructor(
    private _formBuilder: FormBuilder,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private couponService: CouponService,
    private userAddressService: UserAddressService,
    private router: Router,
    public dialog: MatDialog,

  ) {
    this.cartFormGroup = this._formBuilder.group({ cartValid: [false, Validators.requiredTrue] });
   /* this.billingFormGroup = this._formBuilder.group({
        billingValid: [
          false, Validators.requiredTrue
        ],
        addressId: [null, Validators.required],      // ← new
        couponCode: [''], 
        deliveryOption: ['standard', Validators.required],
        paymentOption: ['cod', Validators.required]
      });
      */

    this.billingFormGroup = this._formBuilder.group({
      addressId: [null, Validators.required],
      couponCode: [''],
      deliveryOption: ['standard', Validators.required],
      paymentOption: ['cod', Validators.required]
    });
  }

 

  ngOnInit(): void {
    this.loadCart();
    this.loadAllProducts();
    this.calculateSubTotal();
    this.loadUserAddresses();

  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (res: CartResponseDTO) => {
        //console.log(" cart ==> ", res);

        this.cartItems = res.items;
        this.cartId = res.cartId;

        this.calculateSubTotal(); // ✅ déplacer ici
        this.validateCart();
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de charger le panier', 'error');
      }
    });
  }


  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
       // console.log(" Product ==> ", products);
        this.allProducts = products.map(p => ({
          productId: p.productId,
          imageUrl: p.imageUrl ?? '../assets2/images/products/dash-prd-2.jpg'
        }));
      },
      error: () => {
        console.error('Erreur lors du chargement des produits');
      }
    });
  }

  loadUserAddresses(): void {
      const userId = '49d2554d-61a3-4bc9-b6ee-26046ab29254'; // À remplacer dynamiquement avec AuthService
      this.userAddressService.getAddresses(userId).subscribe({
        next: (res) => {
          this.addresses = res;
        },
        error: (err) => {
          console.error('Erreur chargement adresses:', err);
        }
      });
  }


   selectAddress(addressId: number): void {
    this.selectedAddress = addressId;
    this.billingFormGroup.get('addressId')!.setValue(addressId); // ← sync form
    if (this.billingFormGroup.valid) {
      this.validateBilling();
    }
   } 



  getFullImagePath(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`;
  }

  getProductImage(productId: string): string {
    const product = this.allProducts.find(p => p.productId === productId);
    return product ? this.getFullImagePath(product.imageUrl ?? '../assets2/images/products/dash-prd-2.jpg') : '../assets2/images/products/dash-prd-2.jpg';
  }

  calculateSubTotal(): void {
    this.subTotal = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Recalculer après changement
    this.updateTotalWithCoupon();
  }

  updateTotalWithCoupon(): void {
    if (this.appliedCoupon) {
      const coupon = this.appliedCoupon;

      if (coupon.percentage) {
        // Exemple : 10% => 0.10 * subTotal
        this.discount = this.subTotal * (coupon.discountAmount / 100);
      } else {
        // Remise fixe
        this.discount = coupon.discountAmount;
      }

      // Empêcher la remise de dépasser le sous-total
      if (this.discount > this.subTotal) {
        this.discount = this.subTotal;
      }

    } else {
      this.discount = 0;
    }

    this.totalAfterDiscount = this.subTotal - this.discount;
  }


  applyCoupon(): void {
    const code = this.billingFormGroup.get('couponCode')?.value?.trim();

    if (!code) {
      Swal.fire('Erreur', 'Veuillez entrer un code promo valide.', 'error');
      return;
    }

    this.couponService.applyCoupon(code, this.userId).subscribe({
      next: (coupon) => {
        this.appliedCoupon = coupon;
        this.couponCode = coupon.code;
        this.updateTotalWithCoupon();

        Swal.fire('Succès', `Le code promo "${coupon.code}" a été appliqué.`, 'success');
      },
      error: () => {
        Swal.fire('Erreur', 'Le code promo est invalide ou expiré.', 'error');
        this.appliedCoupon = null;
        this.discount = 0;
        this.updateTotalWithCoupon();
      }
    });
  }

  getTotal(): number {
    const shipping = this.billingFormGroup.get('deliveryOption')?.value === 'express' ? 30 : 0;
    return this.totalAfterDiscount + shipping;
  }

  get shippingCost(): number {
    return this.deliveryOption === 'fast' ? 2 : 0;
  }

  get total(): number {
    return this.subTotal - this.discount + this.shippingCost;
  }

  removeItem(productId: string): void {
     this.cartService.removeFromCart(this.userId, productId).subscribe({
       next: () => {
         Swal.fire('Supprimé', 'L\'article a été supprimé du panier', 'success');
         this.loadCart();
       },
       error: () => {
         Swal.fire('Erreur', 'Impossible de supprimer l\'article', 'error');
       }
     });
   }

  increaseQuantity(item: CartItemResponseDTO): void {
    item.quantity++;
    this.updateCartItemQuantity(item);
  }

  decreaseQuantity(item: CartItemResponseDTO): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItemQuantity(item);
    }
  }

  updateCartItemQuantity(item: CartItemResponseDTO): void {
    this.cartService.updateItemQuantity(this.userId, item.productId, item.quantity).subscribe({
      next: () => {
        Swal.fire({
          title: 'Quantité mise à jour',
          text: `La quantité du produit "${item.productName}" est maintenant ${item.quantity}.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        // Recalculer le sous-total et les totaux ici
        this.calculateSubTotal();
      },
      error: (err) => {
        console.error('Erreur mise à jour quantité', err);
        Swal.fire({
          title: 'Erreur',
          text: 'Impossible de mettre à jour la quantité',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }


  placeOrder(): void {

   // console.log('Form valid:', this.billingFormGroup.valid);
   // console.log('Form errors:', this.billingFormGroup.errors);
   // console.log('Address ID valid:', this.billingFormGroup.get('addressId')?.valid);


     // Validate form
    if (!this.billingFormGroup.valid) {
      this.billingFormGroup.markAllAsTouched();
      
      if (this.billingFormGroup.get('addressId')?.hasError('required')) {
        Swal.fire('Erreur', 'Veuillez sélectionner une adresse.', 'error');
      }
      if (this.billingFormGroup.get('deliveryOption')?.hasError('required')) {
        Swal.fire('Erreur', 'Veuillez sélectionner une option de livraison.', 'error');
      }
      if (this.billingFormGroup.get('paymentOption')?.hasError('required')) {
        Swal.fire('Erreur', 'Veuillez sélectionner un mode de paiement.', 'error');
      }
      return;
    }


    if (this.cartItems.length === 0) {
      return;
    }

    const coupon = this.billingFormGroup.get('couponCode')?.value || null;
    // Save the total BEFORE clearing cart
    this.finalTotal = this.getTotal();

    const payload: OrderRequestDTO = {
      userId: '49d2554d-61a3-4bc9-b6ee-26046ab29254',
      addressId: this.selectedAddress, // attention bien lier ici
      couponCode: this.billingFormGroup.value.couponCode,
      deliveryOption: this.billingFormGroup.value.deliveryOption,
      paymentMethod: this.billingFormGroup.value.paymentOption,
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
 

    // console.log("payload ==> ", payload)

      const dialogRef = this.dialog.open(ProgressDialogComponent, {
          disableClose: true
        });


    this.orderService.placeOrder(payload).subscribe({
      next: (response) => {
        this.orderId = response.orderId;

         dialogRef.close();

        // Marquer étapes comme complétées
        this.cartCompleted = true;
        this.billingCompleted = true;
        this.paymentCompleted = true;

        // Passer à l'étape 3 du stepper
        setTimeout(() => {
          this.stepper.selectedIndex = 2;
        }, 100);



      },
        error: (err) => {
          dialogRef.close();
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la commande. Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(err);
        }
      });


      // Vider le panier localement
        this.cartItems = [];
        this.subTotal = 0;
        this.discount = 0;
        this.totalAfterDiscount = 0;
    
  }


  downloadReceipt(): void {
    const receiptContent = `
    Order Receipt
    -------------
    Order ID: ${this.orderId}
    Thank you for your purchase!
    Total: ${this.finalTotal.toFixed(2)} MAD
    `;

      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${this.orderId}.txt`;
      a.click();

      window.URL.revokeObjectURL(url);
   }


  generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  validateCart(): void {
    this.cartFormGroup.get('cartValid')!.setValue(true);
    this.cartCompleted = true;
  }

  validateBilling(): void {
    this.billingFormGroup.get('billingValid')!.setValue(true);
    this.billingCompleted = true;
  }

  completeCheckout(): void {
    this.paymentCompleted = true;

      Swal.fire({
        title: 'Merci pour votre commande !',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/']); // redirige vers la page d'accueil
      });
  }


  goToShop() {
    this.router.navigate(['/shop']);
  }


  openAddAddress() {
      const dialogRef = this.dialog.open(AddAddressDialogComponent, {
        width: '500px',
        data: { userId: this.userId }
      });

      dialogRef.afterClosed().subscribe(newAddress => {
        if (newAddress) {
          // push into your `addresses` array
          this.addresses.push(newAddress);
          this.selectAddress(newAddress.id);
        }
    });
  }
}
