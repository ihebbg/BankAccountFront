import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountResponseDTO } from '../models/AccountResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly url = `${environment.apiUrl}/BankAccount`;

  constructor(
    private http: HttpClient
  ) { }

  getAccount(): Observable<AccountResponseDTO[]> {
    return this.http.get<AccountResponseDTO[]>(`${this.url}/liste`);
  }
}
