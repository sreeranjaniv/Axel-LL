import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSummaryReportComponent } from './financial-summary-report.component';

describe('FinancialSummaryReportComponent', () => {
  let component: FinancialSummaryReportComponent;
  let fixture: ComponentFixture<FinancialSummaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialSummaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
