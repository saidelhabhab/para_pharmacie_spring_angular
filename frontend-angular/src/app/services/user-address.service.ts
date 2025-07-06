import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAddressResponseDTO } from '../interface/user-address-response-dto';
import { UserAddressRequestDTO } from '../interface/user-address-request-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  private readonly BASE_URL = 'http://localhost:8200/api/v1/user/addresses';

  constructor(private http: HttpClient) {}

  getAddresses(userId: string): Observable<UserAddressResponseDTO[]> {
    return this.http.get<UserAddressResponseDTO[]>(`${this.BASE_URL}/${userId}`);
  }

  addAddress(userId: string, address: UserAddressRequestDTO): Observable<UserAddressResponseDTO> {
    return this.http.post<UserAddressResponseDTO>(`${this.BASE_URL}/${userId}`, address);
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${addressId}`);
  }
}
