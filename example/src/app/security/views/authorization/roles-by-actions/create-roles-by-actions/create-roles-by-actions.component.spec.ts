import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolesByActionsComponent } from './create-roles-by-actions.component';

describe('CreateRolesByActionsComponent', () => {
  let component: CreateRolesByActionsComponent;
  let fixture: ComponentFixture<CreateRolesByActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRolesByActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolesByActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
