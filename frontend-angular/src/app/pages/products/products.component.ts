import { Component, Input, OnInit,ViewEncapsulation  } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductResponseDTO } from 'src/app/interface/product-response-dto';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItemRequestDTO } from 'src/app/interface/cart-item-request-dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  encapsulation: ViewEncapsulation.Emulated // This is the default (styles scoped to this component only)
  
})
export class ProductsComponent implements OnInit {
  allProducts: ProductResponseDTO[] = []; // Stocke tout
  dataSource1: ProductResponseDTO[] = []; // Pour affichage filtré
  readonly backendUrl = 'http://localhost:8200'; 

  currentPage = 0;
  pageSize = 10;
  totalElements = 0;

  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadProducts(this.currentPage);
  }

 

    getFullImagePath(imagePath: string): string {
      return `${this.backendUrl}/${imagePath}`;
    }

    loadProducts(page: number) {
        this.productService.getProductsPage(page, this.pageSize).subscribe({
          next: (res) => {
            this.allProducts = res.content;
            this.dataSource1 = [...this.allProducts]; // clone pour affichage
            this.totalElements = res.totalElements;
            this.currentPage = res.number;
          },
          error: (err) => {
            console.error('Error loading products', err);
          }
        });
    }


    addToCart(product: ProductResponseDTO): void { 
      const userId = '49d2554d-61a3-4bc9-b6ee-26046ab29254'; // À adapter avec ton AuthService

      // ✅ Vérification si le produit est en stock
        if (!product.inStock || product.quantity < 1) {
          Swal.fire({
            icon: 'error',
            title: 'Produit indisponible',
            text: `${product.name} est actuellement en rupture de stock.`,
          });
          return;
        }

      const dto: CartItemRequestDTO = {
        productId: product.productId,
        quantity: 1,
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
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l’ajout au panier.',
          });
        },
      });
    }



  goToProductDetail(id: string) {
    this.router.navigate(['/product-detail', id]);
  }

 
}
