import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContractFormComponent } from './service-contract-form.component';

describe('ServiceContractFormComponent', () => {
  let component: ServiceContractFormComponent;
  let fixture: ComponentFixture<ServiceContractFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceContractFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
