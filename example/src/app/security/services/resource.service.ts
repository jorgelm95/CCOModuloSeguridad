import { Injectable } from '@angular/core';
import { Resource } from '../models/resource.model';
import { RESOURCES } from '../models/fakedata';
import { ConfigService } from './config.service'

@Injectable()
export class ResourceService {

    private host: string
    private port: number
    private pathRoot: string
    private queryJoin: string = ""
    private querySelect: string = ""

    constructor(configService: ConfigService){
        var api = configService.getConfig["apiSecurity"]
        this.host = api["host"] || 'localhost'
        this.port = api["port"] || '3000'
        this.pathRoot = `http://${this.host}:${this.port}/odata/resources`
    }

    getResources(): any {
        this.queryJoin = "expand=resource2"
        this.querySelect = "select=resource2/id_resource,resource2/hereditary,resource2/resource1,resource1,hereditary,id_resource"
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

    createResource(resource: Resource):void {
        fetch(`http://${this.host}:${this.port}/odata/resources`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resource)
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