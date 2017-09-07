import { Component, OnInit,OnChanges,Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  // Inputs
   @Input() records: any[]; // Recibe los datos y encabezados para crear la tabla
   @Input() caption: string; // un title ponerle a la tabla
   keys: string[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Si no se envian registros no se realiza el mapping de las keys
    if(this.records != undefined){
      this.keys = Object.keys(this.records[0]);
    }
    
  }
}
