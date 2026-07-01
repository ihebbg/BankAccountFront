import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AccountService],
      
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // vérifie qu’il n’y a pas de requêtes en attente
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
