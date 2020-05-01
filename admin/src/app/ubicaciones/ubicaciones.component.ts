import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {

  public title;

  constructor() {
    this.title = "Ubicaciones";
   }

  ngOnInit(): void {
    console.log("Ubicaciones cargado!");
  }

}
