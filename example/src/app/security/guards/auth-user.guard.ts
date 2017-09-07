import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private userService: UserService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      // Este guard sirve para impedir que un usuario que no se encuentre logueado 
      // Posea privilegios sin aun estar authentificado.
      if(!this.userService.isAuthenticated()){
        return true
      }
      return false
  }
}
