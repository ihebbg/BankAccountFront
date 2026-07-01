import { Component, OnInit } from '@angular/core';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { CustomerService } from '../../services/customer.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [ButtonAddComponent, AsyncPipe],

  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css'
})
export class ListCustomersComponent {
  constructor(private _customerService: CustomerService) { }
  link: string = "/home/add-customer"
  $customers$ = this._customerService.getCustomers();

}
