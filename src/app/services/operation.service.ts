import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResponseDTO } from '../models/OperationResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
private url="https://localhost:44336/api/Operation"
  constructor(
    private http: HttpClient
  ) { }

  getOperation(): Observable<OperationResponseDTO[]> {
    return this.http.get<OperationResponseDTO[]>( `${this.url}/liste`)
  }
}
