import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../models/role.model'
import { RoleService } from '../../../../services/role.service'

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.css']
})
export class CreateRolesComponent implements OnInit {

  private role: Role

  constructor(private roleService: RoleService) { 
    this.role =  <Role>{}
  }

  ngOnInit() {
  }

  // Funcion para crear los roles
  crearRole(){
    this.roleService.createRole(this.role)
  }

}
