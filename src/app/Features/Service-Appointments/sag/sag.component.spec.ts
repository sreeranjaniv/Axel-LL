import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAGComponent } from './sag.component';

describe('SAGComponent', () => {
  let component: SAGComponent;
  let fixture: ComponentFixture<SAGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
