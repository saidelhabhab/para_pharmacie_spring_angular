import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponseDTO } from 'src/app/interface/product-response-dto';
import { ProductViewComponent } from '../product-view/product-view.component';



@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  allProducts: ProductResponseDTO[] = []; // Stocke tout
  dataSource1: ProductResponseDTO[] = []; // Pour affichage filtré


  currentPage = 0;
  pageSize = 10;
  totalElements = 0;

  searchTerm: string = '';

  constructor(private productService: ProductService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts(this.currentPage);
  }

  readonly backendUrl = 'http://localhost:8200'; 

    getFullImagePath(imagePath: string): string {
      return `${this.backendUrl}/${imagePath}`;
    }

    loadProducts(page: number) {
        this.productService.getProductsPage(page, this.pageSize).subscribe({
          next: (res) => {
            console.log("res  product==>",res)
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
    


    onSearchChange() {
     const term = this.searchTerm.trim().toLowerCase();

      if (!term) {
        this.dataSource1 = [...this.allProducts]; // reset si vide
        return;
      }

      this.dataSource1 = this.allProducts.filter(product =>
        product.name?.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term)
      );
    }


  addProduct(): void {
    this.router.navigate(['/admin/add-product']);
  }

  deleteItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Delete logic here
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  deleteAllItem() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Delete all logic here
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Pour la pagination, si tu utilises mat-paginator (optionnel)
  onPageChange(event: any) {
    this.loadProducts(event.pageIndex);
  }

  openProductDialog(product: ProductResponseDTO): void {
    this.dialog.open(ProductViewComponent, {
      width: '700px',
      data: product
    });
  }

  applyDiscount(product: ProductResponseDTO) {
  Swal.fire({
    title: 'Enter new discounted price',
    input: 'number',
    inputAttributes: {
      min: '0',
      step: '0.01'
    },
    inputValue: product.price.toString(),
    showCancelButton: true,
    confirmButtonText: 'Apply',
    preConfirm: (value: any) => {
      const newPrice = parseFloat(value);
      if (isNaN(newPrice) || newPrice <= 0) {
        Swal.showValidationMessage('Please enter a valid positive number');
        return false;
      }

      const originalPrice = product.oldPrice ?? product.price;

      if (newPrice >= originalPrice) {
        Swal.showValidationMessage('Discounted price must be less than the original price');
        return false;
      }

      return newPrice;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value !== undefined) {
      const newPrice = parseFloat(result.value);
      const originalPrice = product.oldPrice ?? product.price;
      const discount = +(((originalPrice - newPrice) / originalPrice) * 100).toFixed(2);

      this.productService.updateProductDiscount(product.productId, {
        price: newPrice,
        oldPrice: originalPrice,
        discount: discount
      }).subscribe(() => {
        Swal.fire('Discount Applied!', '', 'success');
        this.loadProducts(this.currentPage);
      });
    }
  });
}



    removeDiscount(product: ProductResponseDTO) {
      Swal.fire({
        title: 'Remove discount?',
        text: 'This will reset to original price.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reset',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.updateProductDiscount(product.productId, {
            price: product.oldPrice,
            oldPrice: null,
            discount: null
          }).subscribe(() => {
            Swal.fire('Discount removed.', '', 'success');
            this.loadProducts(this.currentPage);
          });
        }
      });
    }


}