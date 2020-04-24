import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../services/global';
import { Inscripcion } from '../models/inscripcion';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { InscripcionService } from '../services/inscripcion.service';


@Component({
  selector: 'app-mis-inscripciones',
  templateUrl: './mis-inscripciones.component.html',
  styleUrls: ['./mis-inscripciones.component.css'],
  providers: [UsuarioService, InscripcionService]
})
export class MisInscripcionesComponent implements OnInit {

  public url;
  public token;
  public identity;
  public nuevaInscripcion: Inscripcion;
  public inscripciones: Inscripcion[];

  constructor(private _usuarioService: UsuarioService, private _inscripcionService: InscripcionService) { 
    this.url = GLOBAL.url;
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.nuevaInscripcion = new Inscripcion("", "", "");
  }

  ngOnInit(): void {
  }

  inscribirse(idOferta){
    this._inscripcionService.inscribirse(this.token, idOferta).subscribe(
      response => {
        if(!response.idOferta){
          console.log("No se ha realizado el follow");
        }
        else {
          this.inscripciones.push(idOferta);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
