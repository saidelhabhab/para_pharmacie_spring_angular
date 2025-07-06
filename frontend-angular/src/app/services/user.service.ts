import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequestDTO } from '../interface/user-request-dto';
import { UserResponseDTO } from '../interface/user-response-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8200/api/v1/admin/users';

  constructor(private http: HttpClient) {}

  createUser(user: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(this.baseUrl, user);
  }

  getUserById(id: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.baseUrl}/id/${id}`);
  }

  getUserByUserId(userId: string): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.baseUrl}/${userId}`);
  }

  getAllUsers(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(this.baseUrl);
  }

 
  getAllUsersPaged(page: number = 0, size: number = 10, sort: string[] = ['createdTime', 'desc']): Observable<any> {
  const params = {
    page: page.toString(),
    size: size.toString(),
    sort: sort.join(','),
  };
  return this.http.get(`${this.baseUrl}/all-users`, { params });
}


  updateUser(userId: string, user: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>(`${this.baseUrl}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  enableUser(userId: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${userId}/enable`, {});
  }

  getCurrentUser(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.baseUrl}/me`);
  }

  getProfileImage(userId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${userId}/profile-image`, {
      responseType: 'blob',
    });
  }

  searchUsers(term: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/search?q=${encodeURIComponent(term)}&page=${page}&size=${size}`
    );
  }

}
