import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermissionComponent } from './create-permission.component';

describe('CreatePermissionComponent', () => {
  let component: CreatePermissionComponent;
  let fixture: ComponentFixture<CreatePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
