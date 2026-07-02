import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { OperationService } from './operation.service';

describe('OperationService', () => {
  let service: OperationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OperationService
      ]
    });

    service = TestBed.inject(OperationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch operations', () => {
    const mockData = [
      {
        idAccountOperation: 1,
        date: '2025-08-11T14:37:32.530767',
        amount: 10,
        type: 'CREDIT',
        accountType: 'Current',
        nameCustomer: 'iheb'
      }
    ];

    service.getOperation().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Operation/liste`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
