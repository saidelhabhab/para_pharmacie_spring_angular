import { Component, Inject, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import JsBarcode from 'jsbarcode';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductResponseDTO } from 'src/app/interface/product-response-dto';

@Component({
  selector: 'app-product-view',
  standalone: false,
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {

@ViewChild('barcodeSvg', { static: false }) barcodeElement!: ElementRef;

constructor(
    @Inject(MAT_DIALOG_DATA) public product: ProductResponseDTO,
    public dialogRef: MatDialogRef<ProductViewComponent>,
    private sanitizer: DomSanitizer,
    
  ) {}

  backendUrl = 'http://localhost:8200'; // adapte à ton backend

  getFullImagePath(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`;
  }

  close(): void {
    this.dialogRef.close();
  }

  sanitizeHtml(html: string): SafeHtml {
          return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngAfterViewInit(): void {
    if (this.product?.barcode && this.barcodeElement) {
      JsBarcode(this.barcodeElement.nativeElement, this.product.barcode, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 14,
        height: 80,
        width: 2,
        background: "#ffffff",
        lineColor: "#000000",
        margin: 2,
      });
    }
  }

}
