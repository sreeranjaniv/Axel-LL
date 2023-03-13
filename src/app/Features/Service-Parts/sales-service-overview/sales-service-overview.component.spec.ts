import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesServiceOverviewComponent } from './sales-service-overview.component';

describe('SalesServiceOverviewComponent', () => {
  let component: SalesServiceOverviewComponent;
  let fixture: ComponentFixture<SalesServiceOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesServiceOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesServiceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
