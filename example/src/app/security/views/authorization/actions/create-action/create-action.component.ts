import { Component, OnInit } from '@angular/core';
import { Action } from '../../../../models/action.model'
import { ActionService } from '../../../../services/action.service'

@Component({
  selector: 'app-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.css']
})
export class CreateActionComponent implements OnInit {

  private action: Action

  constructor(private actionService: ActionService) { 
    this.action =  <Action>{}
  }

  ngOnInit() {
  }

  crearAction(){
    console.log("click",this.action)
    this.actionService.createAction(this.action)
  }

}
