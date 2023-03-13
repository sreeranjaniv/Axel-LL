import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBrandsComponent } from './store-brands.component';

describe('StoreBrandsComponent', () => {
  let component: StoreBrandsComponent;
  let fixture: ComponentFixture<StoreBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
