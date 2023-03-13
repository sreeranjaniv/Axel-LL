import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCheckInComponent } from './appointment-check-in.component';

describe('AppointmentCheckInComponent', () => {
  let component: AppointmentCheckInComponent;
  let fixture: ComponentFixture<AppointmentCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
