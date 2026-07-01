import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // vérifie qu’il n’y a pas de requêtes en attente
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
