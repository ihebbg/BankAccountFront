import { Component } from '@angular/core';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { OperationService } from '../../services/operation.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-list-operations',
    imports: [ButtonAddComponent, AsyncPipe, DatePipe],
    templateUrl: './list-operations.component.html',
    styleUrl: './list-operations.component.css'
})
export class ListOperationsComponent {
  constructor(private _operationService: OperationService) { }
  link: string = "/home/add-operation"
  $operations$ = this._operationService.getOperation();
}
