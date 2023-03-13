import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidualCalculatorComponent } from './residual-calculator.component';

describe('ResidualCalculatorComponent', () => {
  let component: ResidualCalculatorComponent;
  let fixture: ComponentFixture<ResidualCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidualCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidualCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
