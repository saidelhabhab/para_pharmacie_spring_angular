import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { ProductService } from 'src/app/services/product.service';


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
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.initForm();
    this.loadProduct();
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
      photoFiles: [null]
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
          category: product.category
        });
      },
      error: (err) => {
        console.error('❌ Failed to load product', err);
        this.router.navigate(['/admin/products']);
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
    return;
  }

  const formData = new FormData();
  const formValue = this.form.getRawValue();

  if (this.removedGalleryImages.length > 0) {
    this.removedGalleryImages.forEach(path => {
      formData.append('removedGalleryImages', path);
    });
  }

  for (const key in formValue) {
    if (key === 'photoFiles' && this.newGalleryImages.length > 0) {
      this.newGalleryImages.forEach(image => formData.append('photoFiles', image.file));
    } else if (formValue[key] !== null && formValue[key] !== undefined) {
      formData.append(key, formValue[key]);
    }
  }

  if (this.imageFile) {
    formData.append('imageFile', this.imageFile);
  }

  this.productService.updateProduct(this.productId, formData).subscribe({
    next: () => {
      console.log('✅ Product updated successfully');
      this.router.navigate(['/admin/products']);
    },
    error: (err) => {
      console.error('❌ Error updating product', err);
    }
  });
}




  cancel(): void {
    this.router.navigate(['/admin/products']);
  }

}
