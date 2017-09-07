import { Component, OnInit } from '@angular/core';

// services
import { RolesByActionsService } from '../../../../services/roles-by-actions.service';

@Component({
  selector: 'app-list-roles-by-actions',
  templateUrl: './list-roles-by-actions.component.html',
  styleUrls: ['./list-roles-by-actions.component.css']
})
export class ListRolesByActionsComponent implements OnInit {

  private roleByAction: Array<object>

  constructor(private roleByActionService: RolesByActionsService) { }

  ngOnInit() {
    // Se retorna todo los roles que envia la api
    this.roleByActionService.getRolesByActions()
      .then(data => {
          // se obtiene la respuesta en la variable response
          var response = data["value"]
  
          // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
          this.roleByAction = response.map(function(ele){
            return {
              Id: ele["id_role_by_action"],
              Role: ele["role"]["role1"],
              Action: ele["action"]["action1"]
            }
          })
      });
  }

}
