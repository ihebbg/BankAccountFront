import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountService } from '../../services/account.service';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { DatePipe } from '@angular/common';
import { AccountStatus } from '../../enums/AccountStatus';

@Component({
    selector: 'app-list-accounts',
    imports: [ButtonAddComponent, DatePipe],
    templateUrl: './list-accounts.component.html',
    styleUrl: './list-accounts.component.css'
})
export class ListAccountsComponent {
  private readonly accountService = inject(AccountService);

  readonly link = '/home/add-account';
  readonly status = AccountStatus;
  readonly accounts = toSignal(this.accountService.getAccount(), { initialValue: [] });
}
