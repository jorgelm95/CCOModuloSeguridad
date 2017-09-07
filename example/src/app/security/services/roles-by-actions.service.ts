import { Injectable } from '@angular/core';
import { ConfigService } from './config.service'

@Injectable()
export class RolesByActionsService {

    private host: string
    private port: number
    private pathRoot: string
    private querySelect: string = ""
    private queryJoin: string = ""

    constructor(configService: ConfigService){
        var api = configService.getConfig["apiSecurity"]
        this.host = api["host"] || 'localhost'
        this.port = api["port"] || '3000'
        this.pathRoot = `http://${this.host}:${this.port}/odata/rolesByActions`
    }

    getRolesByActions(): any {
        this.queryJoin = "expand=role,action"
        this.querySelect = "select=role/id_role,role/role1,action/id_action,action/action1,id_role_by_action"
        return fetch(`${this.pathRoot}?$${this.queryJoin}&$${this.querySelect}`,{
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

    createRoleByAction(rolebyaction: object):void {
        fetch(`http://${this.host}:${this.port}/odata/rolesByActions`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rolebyaction)
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