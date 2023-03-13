import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweredByAxelTestIVRComponent } from './powered-by-axel-test-ivr.component';

describe('PoweredByAxelTestIVRComponent', () => {
  let component: PoweredByAxelTestIVRComponent;
  let fixture: ComponentFixture<PoweredByAxelTestIVRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoweredByAxelTestIVRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoweredByAxelTestIVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
