import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseDTO } from '../interface/product-response-dto';
import { ProductRequestDTO } from '../interface/product-request-dto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8200/api/v1/admin/products';

  constructor(private http: HttpClient) {}

  // ✅ GET: paginated products
  getProductsPage(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.baseUrl}/page`, { params });
  }

  // ✅ GET: all products (not paginated)
  getAllProducts(): Observable<ProductResponseDTO[]> {
    return this.http.get<ProductResponseDTO[]>(`${this.baseUrl}`);
  }

  // ✅ GET: product by UUID
  getProductById(productId: string): Observable<ProductResponseDTO> {
    return this.http.get<ProductResponseDTO>(`${this.baseUrl}/${productId}`);
  }

  // ✅ POST: create product (multipart/form-data)
  createProduct(formData: FormData): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(this.baseUrl, formData);
  }

  // ✅ PUT: update product (multipart/form-data)
  updateProduct(productId: string, formData: FormData): Observable<ProductResponseDTO> {
    return this.http.put<ProductResponseDTO>(`${this.baseUrl}/${productId}`, formData);
  }

  // ✅ DELETE: delete product
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  updateProductDiscount(productId: string, data: Partial<ProductRequestDTO>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/products/${productId}/discount`, data);
  }
}
