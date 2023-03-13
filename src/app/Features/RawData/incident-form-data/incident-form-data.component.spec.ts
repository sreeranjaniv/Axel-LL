import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentFormDataComponent } from './incident-form-data.component';

describe('IncidentFormDataComponent', () => {
  let component: IncidentFormDataComponent;
  let fixture: ComponentFixture<IncidentFormDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentFormDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
