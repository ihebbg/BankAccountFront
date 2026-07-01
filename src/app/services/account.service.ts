import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountResponseDTO } from '../models/AccountResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private url="https://localhost:44336/api/BankAccount"
  constructor(
    private http: HttpClient
  ) { }

  getAccount(): Observable<AccountResponseDTO[]> {
    return this.http.get<AccountResponseDTO[]>( `${this.url}/liste`)
  }
}
