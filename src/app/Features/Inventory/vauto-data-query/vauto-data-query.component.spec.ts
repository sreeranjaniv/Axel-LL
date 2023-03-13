import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VAutoDataQueryComponent } from './vauto-data-query.component';

describe('VAutoDataQueryComponent', () => {
  let component: VAutoDataQueryComponent;
  let fixture: ComponentFixture<VAutoDataQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VAutoDataQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VAutoDataQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
