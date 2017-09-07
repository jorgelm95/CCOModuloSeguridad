import { Component, OnInit } from '@angular/core';

// Components
import { TableComponent } from '../../../../components/table/table.component'

// services
import { ActionService } from '../../../../services/action.service';
import { Action } from '../../../../models/action.model';

@Component({
  selector: 'app-list-actions',
  templateUrl: './list-actions.component.html',
  styleUrls: ['./list-actions.component.css']
})
export class ListActionsComponent implements OnInit {

  actions: Action[];

  constructor(private actionService: ActionService) {
    
   }

  ngOnInit() {
    // Se retorna todo las aciones que envia la api
    this.actionService.getActions()
      .then(data => {
          // se obtiene la respuesta en la variable response
          var response = data["value"]

          // Se realiza un mapeo de las caracteristicas que se mostraran en la lista
          this.actions = response.map(function(ele){
            return {
              Id: ele["id_action"],
              Action: ele["action1"]
            }
          })
      });
  }

}
