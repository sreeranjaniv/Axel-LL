import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELeadsCustomersComponent } from './eleads-customers.component';

describe('ELeadsCustomersComponent', () => {
  let component: ELeadsCustomersComponent;
  let fixture: ComponentFixture<ELeadsCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELeadsCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELeadsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
