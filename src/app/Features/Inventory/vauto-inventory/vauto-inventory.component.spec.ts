import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VautoInventoryComponent } from './vauto-inventory.component';

describe('VautoInventoryComponent', () => {
  let component: VautoInventoryComponent;
  let fixture: ComponentFixture<VautoInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VautoInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VautoInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
