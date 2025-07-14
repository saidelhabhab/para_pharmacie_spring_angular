import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent } from 'src/app/pages/layout/progress-dialog/progress-dialog.component';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-edit-product',
  standalone:false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})

export class EditProductComponent implements OnInit, OnDestroy {
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
  productId!: string;

  imageFile!: File;
  photoFiles: File[] = [];
  previewImageUrl: string | null = null;
  newPreviewImageUrl: string | null = null;   // Nouvelle image sélectionnée (temporaire)

  galleryImageUrls: string[] = []; // pour images existantes
  removedGalleryImages: string[] = []; // ← stocker les images supprimées
  newGalleryImages: { file: File, preview: string }[] = []; // Nouvelles images locales avec preview
    
  subcategories: any[] = []; // Liste dynamique des sous-catégories


  readonly backendUrl = 'http://localhost:8200'; 


  categories = [
    'SKINCARE', 'HAIRCARE', 'SUPPLEMENT', 'DEVICE',
    'BABY_PRODUCT', 'HYGIENE', 'ACCESSORY'
  ];

  taxClass = ['NONE', 'TVA_7', 'TVA_10', 'TVA_20'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public  dialog: MatDialog,
    public categoryService: CategoryService,
    
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    
    this.initForm();
    this.loadProduct();

    // 👇 Charger dynamiquement les sous-catégories quand la catégorie change
    this.form.get('category')?.valueChanges.subscribe((value) => {
      this.loadSubcategories(value);
      this.form.patchValue({ selectedCategories: [] }); // Réinitialise les sous-catégories sélectionnées
    });
  }


  ngOnDestroy(): void {
    this.editor.destroy();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      oldPrice: [null, Validators.min(0)],
      discount: [{ value: 0, disabled: true }],
      inStock: [true],
      quantity: [0, [Validators.min(0)]],
      brand: [''],
      taxClass: [''],
      category: ['', Validators.required],
      imageFile: [null],
      photoFiles: [null],
      barcode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13)]],
      selectedCategories: [[]], // ✅ pour gérer les sous-catégories


    });

    this.form.get('price')?.valueChanges.subscribe(() => this.calculateDiscount());
    this.form.get('oldPrice')?.valueChanges.subscribe(() => this.calculateDiscount());
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.previewImageUrl = product.imageUrl; // Assigne directement l'URL de l'image
        this.galleryImageUrls = product.photoUrls || []; // ← Assurez-vous que la clé existe

        this.form.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          oldPrice: product.oldPrice,
          discount: product.discount,
          inStock: product.inStock,
          quantity: product.quantity,
          brand: product.brand,
          taxClass: product.taxClass,
          category: product.category,
          barcode: product.barcode,
           selectedCategories: product.subCategories.map((sub: any) => sub.id) // ✅ important
      });

      // Charger dynamiquement les sous-catégories
      this.loadSubcategories(product.category);

      },
      error: (err) => {
        console.error('❌ Failed to load product', err);
        this.router.navigate(['/admin/products']);
      }
    });
  }

    loadSubcategories(category: string): void {
      this.categoryService.getByProductCategory(category).subscribe({
        next: (res) => {
          this.subcategories = res;
        },
        error: (err) => {
          console.error('❌ Échec du chargement des sous-catégories', err);
        }
      });
    }


    getFullImagePath(imagePath: string): string {
      return `${this.backendUrl}/${imagePath}`;
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

  onImageFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.imageFile = file;
      this.form.patchValue({ imageFile: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.newPreviewImageUrl = reader.result as string;  // Nouvelle image temporaire
      };
      reader.readAsDataURL(file);
    }
  }

  onPhotoFilesChange(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newGalleryImages.push({ file: file, preview: e.target.result });
        };
        reader.readAsDataURL(file);
      }
      // Remplir aussi photoFiles avec les fichiers sélectionnés pour l'upload
      this.photoFiles = Array.from(files);
    }
  }


    // Supprimer une image existante de la galerie (backend)
    removeGalleryImage(index: number): void {
      this.galleryImageUrls.splice(index, 1);
      // Ici tu peux aussi gérer un tableau des images à supprimer côté backend si besoin
    }

    // Supprimer une nouvelle image locale sélectionnée avant upload
    removeNewGalleryImage(index: number): void {
      this.newGalleryImages.splice(index, 1);
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

    const formData = new FormData();
    const formValue = this.form.getRawValue();

    // Vérification du code-barres
    if (!formValue.barcode || formValue.barcode.trim().length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Code-barres invalide',
        text: 'Le code-barres doit contenir au moins 6 caractères.',
      });
      return;
    }

    // Vérification de la quantité
    if (formValue.quantity <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Quantité invalide',
        text: 'La quantité doit être supérieure à 0.',
      });
      return;
    }

    // Supprime les images marquées pour suppression
    if (this.removedGalleryImages.length > 0) {
      this.removedGalleryImages.forEach(path => {
        formData.append('removedGalleryImages', path);
      });
    }

    // Ajoute les champs du formulaire au formData
    for (const key in formValue) {
      if (key === 'photoFiles' && this.newGalleryImages.length > 0) {
        this.newGalleryImages.forEach(image => formData.append('photoFiles', image.file));
      } else if (key === 'selectedCategories') {
        formValue[key].forEach((id: number) => {
          formData.append('subCategoryIds', id.toString()); // ✅ un par un
        });
      } else if (formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    }


    // Ajoute l'image principale si modifiée
    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    // 🔄 Confirmation utilisateur
    Swal.fire({
      title: 'Confirmer la modification ?',
      text: 'Souhaitez-vous vraiment enregistrer les modifications ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, mettre à jour',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Mise à jour en cours...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.productService.updateProduct(this.productId, formData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Produit mis à jour avec succès',
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/admin/products']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur de mise à jour',
              text: 'Impossible de modifier le produit. Veuillez réessayer.',
            });
            console.error('❌ Erreur de mise à jour du produit', err);
          }
        });
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/admin/products']);
  }

}
