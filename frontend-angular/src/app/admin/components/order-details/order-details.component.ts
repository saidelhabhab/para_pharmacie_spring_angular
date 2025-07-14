import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderResponseDTO } from 'src/app/interface/order-response-dto';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  order: OrderResponseDTO;
  allProducts: { productId: string; imageUrl: string | null }[] = [];

  readonly backendUrl = 'http://localhost:8200';

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: OrderResponseDTO },
    private productService: ProductService,
    
  ) {
    this.order = data.order;
  }

  ngOnInit(): void {
   
    this.loadAllProducts();

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

  getFullImagePath(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`;
  }

  getProductImage(productId: string): string {
    const product = this.allProducts.find(p => p.productId === productId);
    return product ? this.getFullImagePath(product.imageUrl ?? '../assets2/images/products/dash-prd-2.jpg') : '../assets2/images/products/dash-prd-2.jpg';
  }


  formatOrderDate(orderDate: number[] | string): Date {
    if (!orderDate) return new Date();

    if (typeof orderDate === 'string') {
      return new Date(orderDate);
    }

    if (Array.isArray(orderDate) && orderDate.length >= 6) {
      const [year, month, day, hour, minute, second] = orderDate;
      return new Date(year, month - 1, day, hour, minute, second);
    }

    return new Date();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}