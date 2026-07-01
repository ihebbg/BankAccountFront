import { Component, Input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-button-add',
  standalone: true,
  imports: [],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.css'
})
export class ButtonAddComponent {
  constructor(private router:Router){}
@Input() data:string="";
add(){
  this.router.navigateByUrl(this.data);
}
}
