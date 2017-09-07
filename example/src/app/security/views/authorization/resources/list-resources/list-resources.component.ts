import { Component, OnInit } from '@angular/core';

// Components
import { TableComponent } from '../../../../components/table/table.component'

// services
import { ResourceService } from '../../../../services/resource.service';
import { Resource } from '../../../../models/resource.model';

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit {

  resources: Resource[]
  
  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    // Se retorna todo los recursos que envia la api
    this.resourceService.getResources()
      .then(data => {
          // se obtiene la respuesta en la variable response
          var response = data["value"]
  
          // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
          this.resources = response.map(function(ele){
            return {
              Id: ele["id_resource"],
              Resource: ele["resource1"],
              Parent: ele["resource2"]["resource1"],
              Hereditary: ele["hereditary"]
            }
          })
      });
  }


}
