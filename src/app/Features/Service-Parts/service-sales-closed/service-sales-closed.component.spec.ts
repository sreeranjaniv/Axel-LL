import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSalesClosedComponent } from './service-sales-closed.component';

describe('ServiceSalesClosedComponent', () => {
  let component: ServiceSalesClosedComponent;
  let fixture: ComponentFixture<ServiceSalesClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSalesClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSalesClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
