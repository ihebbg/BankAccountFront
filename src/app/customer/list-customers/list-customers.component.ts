import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'app-list-customers',
    imports: [ButtonAddComponent],
    templateUrl: './list-customers.component.html',
    styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent {
  private readonly customerService = inject(CustomerService);

  readonly link = '/home/add-customer';
  readonly customers = toSignal(this.customerService.getCustomers(), { initialValue: [] });
}

