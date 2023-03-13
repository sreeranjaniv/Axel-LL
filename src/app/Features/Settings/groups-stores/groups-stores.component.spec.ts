import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsStoresComponent } from './groups-stores.component';

describe('GroupsStoresComponent', () => {
  let component: GroupsStoresComponent;
  let fixture: ComponentFixture<GroupsStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
