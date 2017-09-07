import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { UserService } from '../../services/user.service'
import { ConfigService } from '../../services/config.service'

@Component({
  selector: 'security-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
 
  // Propiedad que recibe las opciones enviadas como propiedad
  @Input() options: object

  // Si esta logueado como Administrador del módulo
  private isLogged: boolean

  // Si esta authentificado como usuario de la aplicacion
  private isAuthenticated: boolean
  
  private user: string

  constructor(private userService: UserService, private configService: ConfigService) {
    this.user = this.configService.getConfig["authorization"]["user"]
  }

  ngOnInit() {
  }

  // Revisa cada ves que encuentra un cambio en el componente
  ngDoCheck(){
    if (this.isLogged !== this.userService.isLogged()) {
      this.isLogged = this.userService.isLogged()
    }
    if(this.isAuthenticated !== this.userService.isAuthenticated()){
      this.isAuthenticated = this.userService.isAuthenticated()
    }
  }
  logout(){
    this.userService.logoutAdmin()
  }
}
