import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweredByAxelIVRComponent } from './powered-by-axel-ivr.component';

describe('PoweredByAxelIVRComponent', () => {
  let component: PoweredByAxelIVRComponent;
  let fixture: ComponentFixture<PoweredByAxelIVRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoweredByAxelIVRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoweredByAxelIVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
