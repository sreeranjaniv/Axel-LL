import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePurchaseComponent } from './vehicle-purchase.component';

describe('VehiclePurchaseComponent', () => {
  let component: VehiclePurchaseComponent;
  let fixture: ComponentFixture<VehiclePurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
