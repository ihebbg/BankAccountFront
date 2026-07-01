import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilComponent } from './accueil.component';
import { provideRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent,RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
