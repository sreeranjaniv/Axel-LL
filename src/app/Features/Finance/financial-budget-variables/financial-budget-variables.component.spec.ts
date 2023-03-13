import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBudgetVariablesComponent } from './financial-budget-variables.component';

describe('FinancialBudgetVariablesComponent', () => {
  let component: FinancialBudgetVariablesComponent;
  let fixture: ComponentFixture<FinancialBudgetVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialBudgetVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBudgetVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
