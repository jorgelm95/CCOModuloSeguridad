import { Component, OnInit } from '@angular/core';

// Services
import { ResourceService } from '../../../../services/resource.service'
import { UserService } from '../../../../services/user.service'
import { RoleService } from '../../../../services/role.service'
import { PermissionService } from '../../../../services/permission.service'

// Models
import { Resource } from '../../../../models/resource.model'
import { User } from '../../../../models/user.model'
import { Role } from '../../../../models/role.model'
import { Permission } from '../../../../models/permission.model'

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css'],
})
export class CreatePermissionComponent implements OnInit {

  private resources: Resource[]
  private users: User[]
  private roles: Role[]
  private permission: Permission
  private role: Role
  private user: User
  private resource: Resource

  constructor(private resourceService: ResourceService, private userService: UserService, 
              private roleService: RoleService, private permissionService: PermissionService) { 
                this.reset()
              }

  ngOnInit() {
    this.resourceService.getResources()
      .then(data => {
        var response = data["value"]
        this.resources = response.map(ele => {
          return {
            id_resource: ele["id_resource"],
            resource: ele["resource1"]

          }
        })
      })

    this.userService.getUsers()
      .then(data => {
        var response = data["value"]
        this.users = response.map(ele => {
          return {
            id_user: ele["id_user"],
            user: ele["name"]
          }
        })
      })

    this.roleService.getRoles()
      .then(data => {
        var response = data["value"]
        this.roles = response.map(ele => {
          return {
            id_role: ele["id_role"],
            role: ele["role1"]
          }
        })
      })
  }
  createPermission(){
    this.permission = {
      id_role: this.role.id_role,
      id_user: this.user.id_user,
      id_resource: this.resource.id_resource
    }
    this.permissionService.createPermission(this.permission)
    this.reset()
    // this.role = role
  }

  reset(){
    this.role = <Role>{}
    this.user = <User>{}
    this.resource = <Resource>{}
    this.permission = <Permission>{}
  }


}
