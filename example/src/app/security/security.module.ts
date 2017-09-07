import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SecurityRoutingModule } from './security-routing.module';

//Components
import { LoginComponent } from './views/authentication/login/login.component';
import { SignupComponent } from './views/authentication/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateResourceComponent } from './views/authorization/resources/create-resource/create-resource.component';
import { ListResourcesComponent } from './views/authorization/resources/list-resources/list-resources.component';
import { CreateActionComponent } from './views/authorization/actions/create-action/create-action.component';
import { ListActionsComponent } from './views/authorization/actions/list-actions/list-actions.component';
import { ListRolesComponent } from './views/authorization/roles/list-roles/list-roles.component';
import { CreateRolesComponent } from './views/authorization/roles/create-roles/create-roles.component';
import { CreatePermissionComponent } from './views/authorization/permissions/create-permission/create-permission.component';
import { ListPermissionsComponent } from './views/authorization/permissions/list-permissions/list-permissions.component';
import { TableComponent } from './components/table/table.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { AuthorizationComponent } from './views/authorization/authorization.component';
import { AdminLoginComponent } from './views/authorization/admin-login/admin-login.component'
import { CreateRolesByActionsComponent } from './views/authorization/roles-by-actions/create-roles-by-actions/create-roles-by-actions.component';
import { ListRolesByActionsComponent } from './views/authorization/roles-by-actions/list-roles-by-actions/list-roles-by-actions.component';
import { CallbackComponent } from './components/callback/callback.component';

// Services
import  { ConfigService,Config } from './services/config.service'
import  { PermissionService } from './services/permission.service'
import  { ActionService } from './services/action.service'
import  { RoleService } from './services/role.service'
import  { ResourceService } from './services/resource.service'
import  { UserService } from './services/user.service';
import { RolesByActionsService } from './services/roles-by-actions.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    CreateResourceComponent,
    ListResourcesComponent,
    CreateActionComponent,
    ListActionsComponent,
    ListRolesComponent,
    CreateRolesComponent,
    CreatePermissionComponent,
    ListPermissionsComponent,
    TableComponent,
    AuthenticationComponent,
    AuthorizationComponent,
    AdminLoginComponent,
    CreateRolesByActionsComponent,
    ListRolesByActionsComponent,
    CallbackComponent
  ],
  exports: [
    AuthenticationComponent,
    AuthorizationComponent
  ],
  providers: [
    PermissionService,
    ActionService,
    RoleService,
    ResourceService,
    UserService,
    ConfigService,
    RolesByActionsService
  ]
})
export class SecurityModule {
  constructor (@Optional() @SkipSelf() parentModule: SecurityModule) {
    if (parentModule) {
      throw new Error(
        'SecurityModule is already loaded. Import it in the AppModule only');
    }
  }

  // Esta Clase recibo todas las configuraciones para el module
  static forRoot(configModule: object): ModuleWithProviders {
    return {
      ngModule: SecurityModule,
      providers: [
        {provide: Config, useValue: configModule }
      ]
    };
  }
}
