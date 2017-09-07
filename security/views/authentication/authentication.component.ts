import { Component, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router'

// Components
import { LoginComponent } from './login/login.component'

// Services
import { UserService } from '../../services/user.service'
import { ConfigService } from '../../services/config.service'


@Component({
  selector: 'security-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  viewProviders: [LoginComponent]
})
export class AuthenticationComponent implements OnInit {
  
  // attributes
  private menuOpt:object
  private isLogged: boolean

  constructor(private router: Router, private userService: UserService, private configService: ConfigService) { 
    this.userService.handleAuthentication();
    this.isLogged = this.userService.isAuthenticated()
    // Se inicializa un objeto para configurar el navbar para authentication
    this.menuOpt = {
      logo: this.configService.getConfig["logo"] || "logo",
      links: [
        { name: 'Login', href: 'authentication/login', module: 'authentication' },
      ]
    }
    // console.log("",location.pathname,this.isLogged,localStorage.getItem('signup'))
    if((location.pathname != "" && location.pathname != "/callback") && this.isLogged == false)
    {
      this.router.navigate(['authentication'])
    }
    else if(location.pathname != "" && this.isLogged == true && localStorage.getItem('signup')){
      this.router.navigate(['authentication/signup'])
    }
    else if(location.pathname != "" && this.isLogged == true && !localStorage.getItem('signup')){
      this.router.navigate([this.configService.getConfig["authentication"]["routeInitial"]])
    }
  }

  ngOnInit() {
   
  }

}
