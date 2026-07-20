import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerResponseDTO } from '../models/CustomerResponseDTO';
import { CustomerRequestDTO } from '../models/CustomerRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly url = `${environment.apiUrl}/Customer`;

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Observable<CustomerResponseDTO[]> {
    return this.http.get<CustomerResponseDTO[]>(`${this.url}/liste`);
  }

  addCustomer(customer: CustomerRequestDTO): Observable<CustomerResponseDTO> {
    return this.http.post<CustomerResponseDTO>(this.url, customer);
  }
}
