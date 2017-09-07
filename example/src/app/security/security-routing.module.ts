import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './views/authentication/login/login.component'
import { SignupComponent } from './views/authentication/signup/signup.component'
import { CreateResourceComponent } from './views/authorization/resources/create-resource/create-resource.component'
import { ListResourcesComponent } from './views/authorization/resources/list-resources/list-resources.component'
import { CreateActionComponent } from './views/authorization/actions/create-action/create-action.component'
import { ListActionsComponent } from './views/authorization/actions/list-actions/list-actions.component'
import { CreateRolesComponent} from './views/authorization/roles/create-roles/create-roles.component'
import { ListRolesComponent } from './views/authorization/roles/list-roles/list-roles.component'
import { CreatePermissionComponent } from './views/authorization/permissions/create-permission/create-permission.component'
import { ListPermissionsComponent } from './views/authorization/permissions/list-permissions/list-permissions.component'
import { AdminLoginComponent } from './views/authorization/admin-login/admin-login.component'
import { CreateRolesByActionsComponent } from './views/authorization/roles-by-actions/create-roles-by-actions/create-roles-by-actions.component';
import { ListRolesByActionsComponent } from './views/authorization/roles-by-actions/list-roles-by-actions/list-roles-by-actions.component';
import { CallbackComponent } from './components/callback/callback.component';

// Guards
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthUserGuard } from './guards/auth-user.guard';


const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'authentication',
    children: [
       { path:'', pathMatch: 'full', redirectTo: 'login' },
       { path: 'login', component: LoginComponent },
       { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'authorization',
    children: [
       { path:'', pathMatch: 'full', redirectTo: 'login' },
       { path: 'login', component: AdminLoginComponent },
       { path: 'create-resource', component: CreateResourceComponent, canActivate:[AuthAdminGuard] },
       { path: 'list-resources', component: ListResourcesComponent, canActivate:[AuthAdminGuard] },
       { path: 'create-action', component: CreateActionComponent, canActivate:[AuthAdminGuard] },
       { path: 'list-actions', component: ListActionsComponent, canActivate:[AuthAdminGuard] },
       { path: 'create-role', component: CreateRolesComponent, canActivate:[AuthAdminGuard] },
       { path: 'list-roles', component: ListRolesComponent, canActivate:[AuthAdminGuard] },
       { path: 'create-permission', component: CreatePermissionComponent, canActivate:[AuthAdminGuard] },
       { path: 'list-permissions', component: ListPermissionsComponent, canActivate:[AuthAdminGuard] },
       { path: 'assigns-actions-to-roles', component: CreateRolesByActionsComponent, canActivate:[AuthAdminGuard] },
       { path: 'list-roles-by-actions', component: ListRolesByActionsComponent, canActivate:[AuthAdminGuard] }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthAdminGuard,AuthUserGuard]
})
export class SecurityRoutingModule { }
