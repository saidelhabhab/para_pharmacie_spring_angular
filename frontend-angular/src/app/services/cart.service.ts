import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemRequestDTO } from '../interface/cart-item-request-dto';
import { CartResponseDTO } from '../interface/cart-response-dto';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8200/api/v1/user/cart'; 

  constructor(private http: HttpClient) {}

  /**
   * Ajouter un produit au panier
   */
  addToCart(userId: number, dto: CartItemRequestDTO): Observable<CartResponseDTO> {
    return this.http.post<CartResponseDTO>(`${this.apiUrl}/${userId}/add`, dto);
  }

  /**
   * Récupérer le panier d'un utilisateur
   */
  getCart(userId: number): Observable<CartResponseDTO> {
    return this.http.get<CartResponseDTO>(`${this.apiUrl}/${userId}`);
  }

  /**
   * Supprimer un produit du panier
   */
  removeFromCart(userId: number, productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/remove/${productId}`);
  }


  /**
   * update Item Quantity du panier
   */
  updateItemQuantity(userId: number, productId: string, quantity: number) {
  const body = { productId, quantity };
  return this.http.put(`${this.apiUrl}/${userId}/update`, body);
}
}