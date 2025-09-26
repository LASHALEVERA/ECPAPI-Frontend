import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private apiUrl = 'https://localhost:7250/api/orders/checkout';

  constructor(private http: HttpClient) {}

  checkout(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}