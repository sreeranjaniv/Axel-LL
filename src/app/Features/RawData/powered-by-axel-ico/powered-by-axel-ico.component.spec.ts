import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweredByAxelICOComponent } from './powered-by-axel-ico.component';

describe('PoweredByAxelICOComponent', () => {
  let component: PoweredByAxelICOComponent;
  let fixture: ComponentFixture<PoweredByAxelICOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoweredByAxelICOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoweredByAxelICOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
