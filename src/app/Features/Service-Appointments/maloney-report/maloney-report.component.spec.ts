import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaloneyReportComponent } from './maloney-report.component';

describe('MaloneyReportComponent', () => {
  let component: MaloneyReportComponent;
  let fixture: ComponentFixture<MaloneyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaloneyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaloneyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
