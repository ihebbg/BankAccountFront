import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-add',
  imports: [],
  standalone: true,
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.css'
})
export class ButtonAddComponent {
  constructor(private router: Router) { }

  readonly data = input.required<string>();

  add() {
    this.router.navigateByUrl(this.data());
  }
}
