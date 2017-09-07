import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { ROLES } from '../models/fakedata';
import { ConfigService } from './config.service'

@Injectable()
export class RoleService {
    
    private host: string
    private port: number

    constructor(configService: ConfigService){
        var api = configService.getConfig["apiSecurity"]
        this.host = api["host"] || 'localhost'
        this.port = api["port"] || '3000'
    }

    getRoles(): any {
        return fetch(`http://${this.host}:${this.port}/odata/roles`,{
         method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            return response.json()
        })
        .catch(err => {
           console.log(err)
           throw err
        })
    }

    createRole(role: Role):void {
        fetch(`http://${this.host}:${this.port}/odata/roles`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(role)
        })
        .then(response => {
            if(response.ok){
                console.log("registro con exitó")
            }
        })
        .catch(err => {
            console.log(err)
            throw err
        })
    }
}