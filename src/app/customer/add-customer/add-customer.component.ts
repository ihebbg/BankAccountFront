import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'app-add-customer',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './add-customer.component.html',
    styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly customerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)]
    })
  });

  submit(): void {
    if (this.customerForm.invalid || this.isSubmitting()) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.customerService.addCustomer(this.customerForm.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/home/customers']),
        error: () => this.errorMessage.set('Unable to create the customer. Please try again.')
      });
  }

}
