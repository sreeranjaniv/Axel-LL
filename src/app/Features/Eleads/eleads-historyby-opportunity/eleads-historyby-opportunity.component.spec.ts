import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ELeadsHistorybyOpportunityComponent } from './eleads-historyby-opportunity.component';

describe('ELeadsHistorybyOpportunityComponent', () => {
  let component: ELeadsHistorybyOpportunityComponent;
  let fixture: ComponentFixture<ELeadsHistorybyOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ELeadsHistorybyOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ELeadsHistorybyOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
