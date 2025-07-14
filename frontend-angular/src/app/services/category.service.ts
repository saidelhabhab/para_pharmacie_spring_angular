
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponseDto } from '../interface/category-response-dto';
import { CategoryRequestDto } from '../interface/category-request-dto';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8200/api/v1/admin/categories';

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(this.baseUrl);
  }

  getCategoryById(id: number): Observable<CategoryResponseDto> {
    return this.http.get<CategoryResponseDto>(`${this.baseUrl}/${id}`);
  }

  createCategory(data: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.http.post<CategoryResponseDto>(this.baseUrl, data);
  }

  updateCategory(id: number, data: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.http.put<CategoryResponseDto>(`${this.baseUrl}/${id}`, data);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByProductCategory(category: string): Observable<CategoryResponseDto[]> {
    return this.http.get<CategoryResponseDto[]>(`${this.baseUrl}/by-category/${category}`);
  }
}
