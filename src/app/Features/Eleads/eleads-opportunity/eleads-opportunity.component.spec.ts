import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleadsOpportunityComponent } from './eleads-opportunity.component';

describe('EleadsOpportunityComponent', () => {
  let component: EleadsOpportunityComponent;
  let fixture: ComponentFixture<EleadsOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleadsOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleadsOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
