import { Component, Input, OnInit,ViewEncapsulation  } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponseDTO } from 'src/app/interface/product-response-dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { CartItemRequestDTO } from 'src/app/interface/cart-item-request-dto';


@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports:[HeaderComponent,
        FooterComponent,
        CarouselModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        
      ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  encapsulation: ViewEncapsulation.Emulated // This is the default (styles scoped to this component only)

})
export class ProductDetailComponent implements OnInit {

    product: ProductResponseDTO | null = null;
    quantity: number = 1;
    quantityForm! : FormGroup;

    backendUrl = 'http://localhost:8200'; // à adapter selon ton backend

    constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private sanitizer: DomSanitizer,
      private cartService: CartService,
      private router: Router,
      private fb: FormBuilder

      
    ) {}

    ngOnInit() {
      const productId = this.route.snapshot.paramMap.get('id');
       // console.log("productId ==> ", this.route.snapshot.paramMap.get('id'))
      if (productId) {
        this.productService.getProductById(productId).subscribe((data) => {
          this.product = data;
        //  console.log("data ==> ", data)
        });
      }

       this.quantityForm = this.fb.group({
        quantity: [1, [Validators.required, Validators.min(1)]]
      });
    }

    increaseQty(): void {
      const current = this.quantityForm.get('quantity')?.value;
      this.quantityForm.get('quantity')?.setValue(current + 1);
    }

    decreaseQty(): void {
      const current = this.quantityForm.get('quantity')?.value;
      if (current > 1) {
        this.quantityForm.get('quantity')?.setValue(current - 1);
      }
    }


    addToCart(product: ProductResponseDTO): void {
      const userId =  '49d2554d-61a3-4bc9-b6ee-26046ab29254'; // à remplacer avec AuthService

      const quantitySelected = this.quantityForm.get('quantity')?.value;

      // ✅ Vérification si le produit est en stock
      if (!product.inStock || product.quantity < 1) {
        Swal.fire({
          icon: 'error',
          title: 'Produit indisponible',
          text: `${product.name} est actuellement en rupture de stock.`,
        });
        return;
      }

      // ✅ Vérification si la quantité demandée est disponible
      if (quantitySelected > product.quantity) {
        Swal.fire({
          icon: 'warning',
          title: 'Quantité insuffisante',
          text: `Seulement ${product.quantity} article(s) disponible(s) pour ${product.name}.`,
        });
        return;
      }

      const dto : CartItemRequestDTO = {
        productId: product.productId,
        quantity: quantitySelected,
      };
     

      this.cartService.addToCart(userId, dto).subscribe({
        next: (res: any) => {
          if (res.message === 'already_in_cart') {
            Swal.fire({
              icon: 'info',
              title: 'Déjà dans le panier',
              html: `
                <p><strong>${product.name}</strong> a été mis à jour dans votre panier.</p>
                <p>Une quantité a été ajoutée au panier.</p>
              `,
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Ajouté au panier !',
              text: `${product.name} a été ajouté avec succès.`,
              timer: 3000,
              showConfirmButton: false,
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l’ajout au panier.',
          });
        },
      });
    }

    buyNow(product: ProductResponseDTO): void {
      this.addToCart(product);
      // Redirection vers la page de checkout ou confirmation
      this.router.navigate(['/checkout']);
    }


     getFullImagePath(imagePath: string): string {
     // console.log("imgages ==> ",`${this.backendUrl}/${imagePath}`)
      return `${this.backendUrl}/${imagePath}`;
    }

     getShortDescription(html: string, wordCount: number = 10): string {
      const plainText = html.replace(/<[^>]*>/g, ''); // Supprime les balises HTML
      const words = plainText.split(/\s+/).slice(0, wordCount);
      return words.join(' ') + '...';
    }

     sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }

    
   

  
 
}