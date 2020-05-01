import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css']
})
export class JornadasComponent implements OnInit {
  public title;
  constructor() { 
    this.title = "Jornadas";
  }

  ngOnInit(): void {
    console.log("Jornadas cargado!");
  }

}
