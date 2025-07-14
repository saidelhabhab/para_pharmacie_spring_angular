import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryRequestDto } from 'src/app/interface/category-request-dto';
import { CategoryResponseDto } from 'src/app/interface/category-response-dto';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-categories',
  standalone:false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  implements OnInit {
  allCategories: CategoryResponseDto[] = [];
  dataSource: CategoryResponseDto[] = [];
  displayedColumns: string[] = ['name', 'parentCategory', 'action'];
  searchTerm = '';

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        this.allCategories = res;
        this.dataSource = [...res];
      },
      error: (err) => console.error(err)
    });
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();
    this.dataSource = term
      ? this.allCategories.filter(c =>
          (c.name ?? '').toLowerCase().includes(term) ||
          (c.parentCategory ?? '').toLowerCase().includes(term)
        )
      : [...this.allCategories];
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((newCategory: CategoryRequestDto) => {
      if (newCategory) {
        this.categoryService.createCategory(newCategory).subscribe(() => this.loadCategories());
      }
    });
  }

  deleteCategory(categoryId: number) {
    Swal.fire({
      title: 'Delete category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.loadCategories();
          Swal.fire('Deleted!', '', 'success');
        });
      }
    });
  }


  getCategoryColorClass(category: string): string {
    switch (category) {
      case 'SKINCARE': return 'bg-danger text-white';         // Rouge
      case 'HAIRCARE': return 'bg-primary text-white';        // Bleu
      case 'SUPPLEMENT': return 'bg-success text-white';      // Vert
      case 'DEVICE': return 'bg-info text-dark';              // Cyan
      case 'BABY_PRODUCT': return 'bg-warning text-dark';     // Jaune
      case 'HYGIENE': return 'bg-secondary text-white';       // Gris
      case 'ACCESSORY': return 'bg-dark text-white';          // Noir
      default: return 'bg-light text-dark';                   // Par défaut
    }
  }


}