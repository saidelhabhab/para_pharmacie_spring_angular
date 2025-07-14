import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryRequestDto } from 'src/app/interface/category-request-dto';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  standalone: false
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;

  parentCategories: string[] = [
    'SKINCARE',
    'HAIRCARE',
    'SUPPLEMENT',
    'DEVICE',
    'BABY_PRODUCT',
    'HYGIENE',
    'ACCESSORY'
  ];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    public dialogRef: MatDialogRef<AddCategoryComponent> // ✅ rendre public ici

  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentCategory: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryData: CategoryRequestDto = this.categoryForm.value;

    this.categoryService.createCategory(categoryData).subscribe({
      next: () => {
        Swal.fire('Succès', 'Catégorie ajoutée avec succès', 'success').then(() => {
          this.dialogRef.close(true); // ✅ ferme le dialog
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Échec de l\'ajout de la catégorie', 'error');
      }
    });
  }

}
