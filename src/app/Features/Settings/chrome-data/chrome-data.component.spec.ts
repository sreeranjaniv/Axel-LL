import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromeDataComponent } from './chrome-data.component';

describe('ChromeDataComponent', () => {
  let component: ChromeDataComponent;
  let fixture: ComponentFixture<ChromeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChromeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
