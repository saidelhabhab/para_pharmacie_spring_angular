import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CouponResponseDTO } from '../interface/coupon-response-dto';
import { CouponRequestDTO } from '../interface/coupon-request-dto';
import { Page } from '../interface/page';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'http://localhost:8200/api/v1/admin/coupons';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Créer un nouveau coupon
   */
  createCoupon(dto: CouponRequestDTO): Observable<CouponResponseDTO> {
    return this.http.post<CouponResponseDTO>(`${this.apiUrl}`, dto);
  }

  /**
   * ✅ Mettre à jour un coupon existant
   */
  updateCoupon(couponId: string, dto: CouponRequestDTO): Observable<CouponResponseDTO> {
    return this.http.put<CouponResponseDTO>(`${this.apiUrl}/${couponId}`, dto);
  }

  /**
   * ✅ Obtenir un coupon par son ID
   */
  getCouponById(couponId: string): Observable<CouponResponseDTO> {
    return this.http.get<CouponResponseDTO>(`${this.apiUrl}/${couponId}`);
  }

  /**
   * ✅ Supprimer un coupon
   */
  deleteCoupon(couponId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${couponId}`);
  }

  /**
   * ✅ Obtenir tous les coupons (avec pagination)
   */
  getCoupons(page: number = 0, size: number = 10): Observable<Page<CouponResponseDTO>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<CouponResponseDTO>>(this.apiUrl, { params });
  }

  /**
   * ✅ Appliquer un coupon (vérifier sa validité côté backend)
   */
  applyCoupon(code: string, userId: string): Observable<CouponResponseDTO> {
    const params = new HttpParams()
      .set('code', code)
      .set('userId', userId.toString());

    return this.http.post<CouponResponseDTO>(`${this.apiUrl}/apply`, null, { params });
  }
}
