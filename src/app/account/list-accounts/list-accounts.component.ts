import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AccountStatus } from '../../enums/AccountStatus';

@Component({
    selector: 'app-list-accounts',
    imports: [ButtonAddComponent, AsyncPipe, DatePipe],
    templateUrl: './list-accounts.component.html',
    styleUrl: './list-accounts.component.css'
})
export class ListAccountsComponent {
  constructor(private _accountService: AccountService) { }
  link: string = "/home/add-account"
  status = AccountStatus;

  $accounts$ = this._accountService.getAccount();
}
