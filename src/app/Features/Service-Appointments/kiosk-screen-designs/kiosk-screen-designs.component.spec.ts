import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskScreenDesignsComponent } from './kiosk-screen-designs.component';

describe('KioskScreenDesignsComponent', () => {
  let component: KioskScreenDesignsComponent;
  let fixture: ComponentFixture<KioskScreenDesignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskScreenDesignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskScreenDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
