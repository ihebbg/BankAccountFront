import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerResponseDTO } from '../models/CustomerResponseDTO';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private url="https://localhost:44336/api/Customer"
  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Observable<CustomerResponseDTO[]> {
    return this.http.get<CustomerResponseDTO[]>( `${this.url}/liste`)
  }
}
