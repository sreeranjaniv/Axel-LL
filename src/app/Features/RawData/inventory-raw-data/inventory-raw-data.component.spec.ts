import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRawDataComponent } from './inventory-raw-data.component';

describe('InventoryRawDataComponent', () => {
  let component: InventoryRawDataComponent;
  let fixture: ComponentFixture<InventoryRawDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRawDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRawDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
