import { Component, OnDestroy, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent } from 'src/app/pages/layout/progress-dialog/progress-dialog.component';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-product',
  standalone:false,
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',

  

})
export class AddProductComponent implements OnInit, OnDestroy {

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
    ['undo', 'redo']
  ];

  form!: FormGroup;

  tags: string[] = [];
  categories = [
    'SKINCARE', 'HAIRCARE', 'SUPPLEMENT', 'DEVICE',
    'BABY_PRODUCT', 'HYGIENE', 'ACCESSORY'
  ];
  selectedCategory: string = '';
  subcategories: any[] = []; // à remplir dynamiquement depuis l’API



  taxClass = ['NONE', 'TVA_7', 'TVA_10', 'TVA_20'];

  imageFile!: File;
  photoFiles: File[] = [];

  previewImageUrl: string | null = null;
  newPreviewImageUrl: string | null = null;   // Nouvelle image sélectionnée (temporaire)
  
  galleryImageUrls: string[] = []; // pour images existantes
  removedGalleryImages: string[] = []; // ← stocker les images supprimées
  galleryPreviewUrls: string[] = [];

  readonly backendUrl = 'http://localhost:8200'; 


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private categoryService: CategoryService
    
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      oldPrice: [null, Validators.min(0)],
      discount: [null, Validators.min(0)],
      inStock: [true],
      quantity: [0, [Validators.min(0)]],
      brand: [''],
      taxClass: [''],
      category: ['', Validators.required],
      selectedTags: [[]],
      selectedCategories: [[]],
      imageFile: [null],
      photoFiles: [null],
      barcode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13)]],
    });

    // Automatic discount calculation when oldPrice or price changes
    this.form.get('price')?.valueChanges.subscribe(() => this.calculateDiscount());
    this.form.get('oldPrice')?.valueChanges.subscribe(() => this.calculateDiscount());
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onCategoryChange(): void {
  const selectedCategory = this.form.get('category')?.value;
  if (selectedCategory) {
    this.categoryService.getByProductCategory(selectedCategory).subscribe((res) => {
      this.subcategories = res;
      this.form.patchValue({ selectedCategories: [] }); // Reset subcategories
    });
  }
}

   onImageFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];

      // 🔁 Créer une URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  

  onPhotoFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      Array.from(input.files).forEach(file => {
        this.photoFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.galleryPreviewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      // Pour permettre de re-sélectionner les mêmes fichiers
      input.value = '';
    }
  }

  removeGalleryImage(index: number): void {
    this.photoFiles.splice(index, 1);
    this.galleryPreviewUrls.splice(index, 1);
  }


  calculateDiscount(): void {
    const price = this.form.get('price')?.value;
    const oldPrice = this.form.get('oldPrice')?.value;
    if (price && oldPrice && oldPrice > price) {
      const discount = ((oldPrice - price) / oldPrice) * 100;
      this.form.patchValue({ discount: Math.round(discount) });
    } else {
      this.form.patchValue({ discount: 0 });
    }
  }

  


  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs requis correctement.',
      });
      return;
    }

    const formValue = this.form.value;

    // Vérifie que l'image principale est sélectionnée
    if (!this.imageFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Image principale manquante',
        text: 'Veuillez sélectionner une image principale du produit.',
      });
      return;
    }

     // Vérifie la quantité minimale
    if (formValue.quantity <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Quantité invalide',
        text: 'La quantité doit être supérieure à 0.',
      });
      return;
    }

    // Vérifie si le champ "barcode" est vide
    if (!formValue.barcode || formValue.barcode.trim().length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Code-barres invalide',
        text: 'Le code-barres doit contenir au moins 6 caractères.',
      });
      return;
    }

    // Confirmation de l'utilisateur avant de soumettre
    Swal.fire({
      title: 'Confirmer l’ajout du produit ?',
      text: 'Voulez-vous vraiment enregistrer ce produit ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, enregistrer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        for (const key in formValue) {
          if (key === 'selectedTags') {
            formData.append('tags', JSON.stringify(formValue[key]));
          } else if (key === 'selectedCategories') {
          //  formData.append('subCategoryIds', JSON.stringify(formValue[key])); par [7,8]

            formValue[key].forEach((id: number) => {
              formData.append('subCategoryIds', id.toString());  // ✅ un par un 7 and 8 
            });
          } else if (formValue[key] !== null && formValue[key] !== undefined) {
            formData.append(key, formValue[key]);
          }
        }




        formData.append('imageFile', this.imageFile);

        Swal.fire({
          title: 'Enregistrement en cours...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

       console.log('🧾 Contenu du FormData :');
      formData.forEach((value, key) => {
         console.log(`${key}:`, value);
       });


      
      this.productService.createProduct(formData).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Produit ajouté avec succès',
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/admin/products']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur serveur',
              text: 'Impossible d’enregistrer le produit. Veuillez réessayer plus tard.',
            });
            console.error('Erreur :', err);
          }
        });
      
      }

    
    });  
  }


  
  cancel(): void {
      this.router.navigate(['/admin/products']);
  }
}
