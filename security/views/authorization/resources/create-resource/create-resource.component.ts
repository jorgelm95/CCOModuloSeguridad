import { Component, OnInit } from '@angular/core';
import { Resource } from '../../../../models/resource.model'
import { ResourceService } from '../../../../services/resource.service'

declare var $:any;
@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {

  private resource: Resource
  private resources: Resource[]

  constructor(private resourceService: ResourceService) { 
    this.reset()
  }

  ngOnInit() {
    this.resourceService.getResources()
      .then(data => {
        var response = data["value"]
        this.resources = response.map(ele => {
          return {
            id: ele["id_resource"],
            resource: ele["resource1"]
            
          }
        })
      })
    
  }

  createResource(){
    this.resource = {
      id_resource: (this.resources.length + 1).toString(),
      resource1: this.resource["resource1"],
      parent: (this.resource["parent"]) ? this.resource["parent"] : this.resources.length + 1,
      hereditary: (this.resource["hereditary"]) ? this.resource["hereditary"] : false
    }
    this.resourceService.createResource(this.resource)
    this.reset()
  }

  reset(){
    this.resource =  <Resource>{}
  }

}
