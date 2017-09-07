import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Este guard sirve para impedir que un usuario que no se encuentre logueado
    // Como administrador Ingrese al módulo de seguridad, es recomendable
    // en un futuro realizar estaba validación en base a tokens o una tabla
    // porque posiblemente si se ingresa un clave en el localstorage con admin
    // le de acceso a funcionalidades del administrado.
    if(localStorage.getItem('admin')){
      return true
    }
    return false
  }
}
