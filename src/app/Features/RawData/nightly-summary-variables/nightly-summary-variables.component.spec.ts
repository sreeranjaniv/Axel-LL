import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NightlySummaryVariablesComponent } from './nightly-summary-variables.component';

describe('NightlySummaryVariablesComponent', () => {
  let component: NightlySummaryVariablesComponent;
  let fixture: ComponentFixture<NightlySummaryVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightlySummaryVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightlySummaryVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
