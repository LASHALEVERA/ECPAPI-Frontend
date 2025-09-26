import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  userNameOrEmail: string;
  token: string;
}

export interface RegisterRequest {
  id: number;
  userNameOrEmail: string;
  email: string;
  password: string;
  phoneNumber: string;
  isActive: boolean;
  userTypeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private currentUserSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // აღდგენა token-ის localStorage-დან
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.currentUserSubject.next(this.getUsernameFromToken(token));
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next(response.userNameOrEmail);
        })
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/Create`, userData);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    //
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }

  private getUsernameFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.unique_name;
    } catch (e) {
      return '';
    }
  }
}