import { TestBed } from '@angular/core/testing';

import { OperationService } from './operation.service';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';


describe('OperationService', () => {
  let service: OperationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting ], // ✅ obligatoire
      providers: [OperationService]
    });

    service = TestBed.inject(OperationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // vérifie qu’il n’y a pas de requêtes en attente
  });

  it('should fetch operations', () => {
    const mockData = [
      {
        idAccountOperation: 1,
        date: "2025-08-11T14:37:32.530767",
        amount: 10,
        type: "CREDIT",
        accountType: "Current",
        nameCustomer: "iheb"
      }
    ];

    service.getOperation().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(' https://localhost:44336/api/Operation/liste'); // l’URL de ton API
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // renvoie la fausse réponse
  });
});
