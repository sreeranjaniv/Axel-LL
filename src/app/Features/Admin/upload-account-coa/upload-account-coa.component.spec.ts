import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAccountCOAComponent } from './upload-account-coa.component';

describe('UploadAccountCOAComponent', () => {
  let component: UploadAccountCOAComponent;
  let fixture: ComponentFixture<UploadAccountCOAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAccountCOAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAccountCOAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
