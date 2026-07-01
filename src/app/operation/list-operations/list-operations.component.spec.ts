import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperationsComponent } from './list-operations.component';
import { By } from '@angular/platform-browser';

describe('ListOperationsComponent', () => {
  let component: ListOperationsComponent;
  let fixture: ComponentFixture<ListOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should render h2 title "Operations"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Operations');
  });

  it('should render app-button-add', () => {
    const buttonAdd = fixture.debugElement.query(By.css('app-button-add'));
    expect(buttonAdd).toBeTruthy();
  });
});
