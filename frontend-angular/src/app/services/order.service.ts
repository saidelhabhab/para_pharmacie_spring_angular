import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequestDTO } from '../interface/order-request-dto';
import { OrderResponseDTO } from '../interface/order-response-dto';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = 'http://localhost:8200/api/v1/user/orders';
  private readonly API_URL_ADMIN = 'http://localhost:8200/api/v1/admin/orders';


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
   * Obtenir toutes les commandes d’un utilisateur by PAGES
   */
    getOrdersByUserPaginated(userId: string, page: number = 0, size: number): Observable<Page<OrderResponseDTO>> {
      const params = new HttpParams().set('page', page).set('size', size);
      return this.http.get<Page<OrderResponseDTO>>(`${this.API_URL}/user/${userId}/paginated`, { params });
    }

    getAllOrdersPaginated(page: number, size: number): Observable<Page<OrderResponseDTO>> {
      return this.http.get<Page<OrderResponseDTO>>(`${this.API_URL_ADMIN}/paginated`, {
        params: new HttpParams()
          .set('page', page)
          .set('size', size)
      });
    }



    updateOrderStatus(orderId: string, newStatus: string): Observable<void> {
      return this.http.patch<void>(
        `${this.API_URL_ADMIN}/${orderId}/status`,
        {},
        { params: { status: newStatus } }
      );
    }


    
      getAllStatuses(): Observable<string[]> {
        return this.http.get<string[]>(`${this.API_URL_ADMIN}/statuses`);
      }

  

    /**
     * Annuler une commande
     */
    cancelOrder(orderId: string): Observable<void> {
      return this.http.delete<void>(`${this.API_URL}/${orderId}`);
    }
}
