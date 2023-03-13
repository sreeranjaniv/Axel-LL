import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFound401Component } from './page-not-found401.component';

describe('PageNotFound401Component', () => {
  let component: PageNotFound401Component;
  let fixture: ComponentFixture<PageNotFound401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFound401Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFound401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
