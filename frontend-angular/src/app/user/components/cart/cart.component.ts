import { Component, OnInit } from '@angular/core';
import { CartItemResponseDTO } from 'src/app/interface/cart-item-response-dto';
import { CartResponseDTO } from 'src/app/interface/cart-response-dto';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {

  cartItems: CartItemResponseDTO[] = [];
  cartId!: number;
  userId: string = '49d2554d-61a3-4bc9-b6ee-26046ab29254'; // à remplacer par un vrai userId (auth service par exemple)

allProducts: { productId: string; imageUrl: string | null }[] = [];

  readonly backendUrl = 'http://localhost:8200';

  constructor(
    private cartService: CartService,   
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadAllProducts(); // 👈 Ajout

  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (res: CartResponseDTO) => {
        this.cartItems = res.items;
        this.cartId = res.cartId;
        //console.log('Cart loaded:', res);
      },
      error: (err) => {
        Swal.fire('Erreur', 'Impossible de charger le panier', 'error');
      }
    });
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
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

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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

  getFullImagePath(imagePath: string): string {
    //console.log("image ==> ", `${this.backendUrl}/${imagePath}`)
    return `${this.backendUrl}/${imagePath}`;
  }

  getProductImage(productId: string): string {
    const product = this.allProducts.find(p => p.productId === productId);
    return product 
      ? this.getFullImagePath(product.imageUrl ?? '../assets2/images/products/dash-prd-2.jpg')
      : '../assets2/images/products/dash-prd-2.jpg'; 
  }


  increaseQuantity(item: CartItemResponseDTO) {
    item.quantity++;
    this.updateCartItemQuantity(item);
  }

  decreaseQuantity(item: CartItemResponseDTO) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItemQuantity(item);
    }
  }

  updateCartItemQuantity(item: CartItemResponseDTO) {
    this.cartService.updateItemQuantity(this.userId, item.productId, item.quantity).subscribe({
      next: () => {
        Swal.fire({
          title: 'Quantité mise à jour',
          text: `La quantité du produit "${item.productName}" est maintenant ${item.quantity}.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
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

  
  placeOrder() {
    Swal.fire({
      title: 'Commande validée !',
      text: 'Votre commande a été enregistrée avec succès.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // TODO : Appelle ici le service de backend pour traiter la commande
  }


}
