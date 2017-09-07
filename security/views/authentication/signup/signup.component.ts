import { Component, OnInit, Input,Attribute } from '@angular/core';
import { Router } from '@angular/router'

// Services
import { ConfigService } from '../../../services/config.service'
import { UserService } from '../../../services/user.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  // Attributes
  private options: object
  private user: any
  private userProfile: object

  constructor(private configService: ConfigService, private userService: UserService,private router:Router) { 
    
    // Guardar ambito global
    var self = this

    // Inicializar las propiedades recibidas desde el modulo principal
    this.options = this.configService.getConfig["authentication"]['signUpOpts']

    // Retornar los atributos obtenidos en open authentication
    this.userProfile = this.userService.userProfile()

    // guardar en el array todas las fields enviadas en el archivo de config
    var keys = this.options["fields"].map(function(ele){
        return ele.name.toLowerCase().split(' ').join('_')
    })

    // inicializar el objeto que se mapeara con lo recibido de auth0
    this.user = {} 

    // Se realiza un mapeo de las keys enviadas en los fields
    // con la informacion recibida de auth0
    // esto con el fin de reciclar campos y se llenen con 
    // informacion obtenida
    keys.map(function(key){
      // Creo una propiedad para el objecto self.user con el valor recibido en las propiedad de userProfile
      Object.defineProperty(self.user, key, {value: (self.userProfile[key] != undefined) ? self.userProfile[key] : null, writable:true, enumerable: true, configurable: true})
    })

  }
 
  ngOnInit() {
  }

  signup(){
    // Se debe agregar el id del usuario
    this.user["id_user"] = this.userProfile["id"].toString()
    
    // Registrar un nuevo usuario
    this.userService.createUser(this.user)
     .then(response => {
            if(response.ok){
              localStorage.removeItem('signup')
              this.router.navigate([this.configService.getConfig["authentication"]["routeInitial"]])
            }
        })
  }

  cancel(){
    this.userService.logout()
  }

}
