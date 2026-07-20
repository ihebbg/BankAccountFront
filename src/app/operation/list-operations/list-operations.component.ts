import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonAddComponent } from '../../shared/button-add/button-add.component';
import { OperationService } from '../../services/operation.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-list-operations',
    imports: [ButtonAddComponent, DatePipe],
    templateUrl: './list-operations.component.html',
    styleUrl: './list-operations.component.css'
})
export class ListOperationsComponent {
  private readonly operationService = inject(OperationService);

  readonly link = '/home/add-operation';
  readonly operations = toSignal(this.operationService.getOperation(), { initialValue: [] });
}
