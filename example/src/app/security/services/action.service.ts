import { Injectable } from '@angular/core';
import { Action } from '../models/action.model';
import { ACTIONS } from '../models/fakedata';
import { ConfigService } from './config.service'

@Injectable()
export class ActionService {
    
    // Propiedades
    private host: string
    private port: number
    
    constructor(configService: ConfigService){
        // Configuracion Inicial
        var api = configService.getConfig["apiSecurity"]
        this.host = api["host"] || 'localhost'
        this.port = api["port"] || '3000'
    }

    // Obtiene todas las actions de api Odata
    getActions():any {
      return fetch(`http://${this.host}:${this.port}/odata/actions`,{
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

    // Crear una nueva acción
    createAction(action: Action):void {
        fetch(`http://${this.host}:${this.port}/odata/actions`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action)
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