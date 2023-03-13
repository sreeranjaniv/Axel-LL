import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCoaComponent } from './accounts-coa.component';

describe('AccountsCoaComponent', () => {
  let component: AccountsCoaComponent;
  let fixture: ComponentFixture<AccountsCoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
