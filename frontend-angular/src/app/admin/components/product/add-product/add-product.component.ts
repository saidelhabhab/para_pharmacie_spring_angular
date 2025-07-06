import { Component, OnDestroy, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

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

  taxClass = ['NONE', 'TVA_7', 'TVA_10', 'TVA_20'];

  imageFile!: File;
  photoFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
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
      photoFiles: [null]
    });

    // Automatic discount calculation when oldPrice or price changes
    this.form.get('price')?.valueChanges.subscribe(() => this.calculateDiscount());
    this.form.get('oldPrice')?.valueChanges.subscribe(() => this.calculateDiscount());
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    }
  }

  onPhotoFilesChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.photoFiles = Array.from(files);
      this.form.patchValue({ photoFiles: this.photoFiles });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const formValue = this.form.value;

    for (const key in formValue) {
      if (key === 'photoFiles' && this.photoFiles.length > 0) {
        this.photoFiles.forEach(file => formData.append('photoFiles', file));
      } else if (key === 'selectedTags') {
        formData.append('tags', JSON.stringify(formValue[key]));
      } else if (key === 'selectedCategories') {
        formData.append('categories', JSON.stringify(formValue[key]));
      } else if (formValue[key] !== null && formValue[key] !== undefined) {
        formData.append(key, formValue[key]);
      }
    }

    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        console.log('✅ Product added', res);
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('❌ Error adding product', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
  }
}
