import { Component, OnInit } from '@angular/core';

// Components
import { TableComponent } from '../../../../components/table/table.component'

// services
import { RoleService } from '../../../../services/role.service';
import { Role } from '../../../../models/role.model';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  roles: Role[]

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    // Se retorna todo los roles que envia la api
    this.roleService.getRoles()
      .then(data => {
          // se obtiene la respuesta en la variable response
          var response = data["value"]
  
          // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
          this.roles = response.map(function(ele){
            return {
              Id: ele["id_role"],
              Role: ele["role1"],
            }
          })
      });
  }

}
