import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequestDTO } from '../interface/order-request-dto';
import { OrderResponseDTO } from '../interface/order-response-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = 'http://localhost:8200/api/v1/user/orders';

  constructor(private http: HttpClient) {}

  /**
   * Passer une commande
   */
  placeOrder(orderRequest: OrderRequestDTO): Observable<OrderResponseDTO> {
    return this.http.post<OrderResponseDTO>(`${this.API_URL}`, orderRequest);
  }

  /**
   * Obtenir une commande par ID
   */
  getOrderById(orderId: string): Observable<OrderResponseDTO> {
    return this.http.get<OrderResponseDTO>(`${this.API_URL}/${orderId}`);
  }

  /**
   * Obtenir toutes les commandes d’un utilisateur
   */
  getOrdersByUser(userId: string): Observable<OrderResponseDTO[]> {
    return this.http.get<OrderResponseDTO[]>(`${this.API_URL}/user/${userId}`);
  }

  /**
   * Annuler une commande
   */
  cancelOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${orderId}`);
  }
}
