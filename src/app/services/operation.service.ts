import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OperationResponseDTO } from '../models/OperationResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private readonly url = `${environment.apiUrl}/Operation`;

  constructor(
    private http: HttpClient
  ) { }

  getOperation(): Observable<OperationResponseDTO[]> {
    return this.http.get<OperationResponseDTO[]>(`${this.url}/liste`);
  }
}
