import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model'

// Services
import { ConfigService } from '../../../services/config.service'

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  private user: object 
  private userAdmin: string
  private passwordAdmin: string

  constructor(private configService: ConfigService, private router: Router) { 
    this.user = {}
    this.userAdmin = this.configService.getConfig["authorization"]["user"] || 'Admin'
    this.passwordAdmin = this.configService.getConfig["authorization"]["password"] || 'Admin2017*'
  }

  ngOnInit() {
  }
  
  login(){
    if(this.userAdmin == this.user["user"] && this.user["password"] == this.passwordAdmin){
      localStorage.setItem('admin', JSON.stringify(this.user))
      this.router.navigate(['/authorization/create-resource'])
    }
  }
}
