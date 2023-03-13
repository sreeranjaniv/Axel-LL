import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylocityEmployeeComponent } from './paylocity-employee.component';

describe('PaylocityEmployeeComponent', () => {
  let component: PaylocityEmployeeComponent;
  let fixture: ComponentFixture<PaylocityEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylocityEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylocityEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
