import { Component, OnInit } from '@angular/core';

// Services
import { ActionService } from '../../../../services/action.service'
import { RoleService } from '../../../../services/role.service'
import { RolesByActionsService } from '../../../../services/roles-by-actions.service'

// Models
import { Action } from '../../../../models/action.model'
import { Role } from '../../../../models/role.model'

@Component({
  selector: 'app-create-roles-by-actions',
  templateUrl: './create-roles-by-actions.component.html',
  styleUrls: ['./create-roles-by-actions.component.css']
})
export class CreateRolesByActionsComponent implements OnInit {

  private actions: Action[]
  private roles: Role[]
  private roleByAction: object
  private role: Role
  private action: Action

  constructor(private actionService: ActionService, private roleService: RoleService, 
              private roleByActionService: RolesByActionsService) { 
                this.reset()
              }

  ngOnInit() {
    this.actionService.getActions()
      .then(data => {
        var response = data["value"]
        this.actions = response.map(ele => {
          return {
            id_action: ele["id_action"],
            action: ele["action1"]

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
  createRoleByAction(){
    this.roleByAction = {
      id_role: this.role.id_role,
      id_action: this.action.id_action
    }
    this.roleByActionService.createRoleByAction(this.roleByAction)
    this.reset()
  }

  reset(){
    this.role = <Role>{}
    this.action = <Action>{}
    this.roleByAction = {}
  }

}
