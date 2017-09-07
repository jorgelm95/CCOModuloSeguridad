import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRolesByActionsComponent } from './list-roles-by-actions.component';

describe('ListRolesByActionsComponent', () => {
  let component: ListRolesByActionsComponent;
  let fixture: ComponentFixture<ListRolesByActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRolesByActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRolesByActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
