import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// // Services
import { ConfigService } from '../../services/config.service'
import { UserService } from '../../services/user.service'


@Component({
  selector: 'security-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  
  // Attributes
  private menuOpt:object
  config: string = '';
  private isLogged: boolean
  
  constructor(private configService: ConfigService, private userService: UserService, private router: Router) { 

    this.isLogged = this.userService.isLogged()

    // Se inicializa un objeto para configurar el navbar para la authorization
    this.menuOpt = {
      logo: this.configService.getConfig["logo"] || "logo",
      links: [
        { name: 'Resources', href: 'authorization/create-resource', module: 'authorization'},
        { name: 'Actions', href: 'authorization/create-action', module: 'authorization'},
        { name: 'Roles', href: 'authorization/create-role', module: 'authorization'},
        { name: 'Permissions', href: 'authorization/create-permission', module: 'authorization'},
      ] 
    }

    if(!this.isLogged){
      this.router.navigate(['authorization'])
    }

    else if(this.router.url == '/'){
      this.router.navigate(['/authorization/create-permission'])
    }
    
  }

  ngOnInit() {
    
  }

}
