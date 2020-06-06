import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionService } from '../services/ubicacion.service';
import { JornadaService } from '../services/jornada.service';
import { OfertaService } from '../services/oferta.service';
import { Observable } from 'rxjs';
import { InscripcionService } from '../services/inscripcion.service';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';
import { Ubicacion } from '../models/ubicacion';
import { Jornada } from '../models/jornada';
import { Oferta } from '../models/oferta';
import { Inscripcion } from '../models/inscripcion';


@Component({
  selector: 'app-mis-inscripciones',
  templateUrl: './mis-inscripciones.component.html',
  styleUrls: ['./mis-inscripciones.component.css'],
  providers: [
    UsuarioService,
    UbicacionService,
    JornadaService,
    OfertaService,
    InscripcionService
  ]
})
export class MisInscripcionesComponent implements OnInit {

  public url;
  public identity;
  public token;
  public status;
  public ubicaciones: Ubicacion[];
  public jornadas: Jornada[];
  public inscripcionesArray;
  public ofertas;
  public listaIdOfertas = [];

  constructor(private _usuarioService: UsuarioService,
    private _ubicacionService: UbicacionService,
    private _jornadaService: JornadaService,
    private _ofertaService: OfertaService,
    private _inscripcionService: InscripcionService, private _router: Router) 
  { 
    this.url = GLOBAL.url;
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    //Si no hay sesion ni eres usuario redirigimos al login
    //|| this.identity.acceso != '3'
    if(!this.identity || this.identity.acceso != '3'){
      this._router.navigate(['/login']);
    }
    

    
  }
  

  ngOnInit(): void {

    this.getUbicaciones();
    this.getJornadas();
    this.getOfertas();
    this.misInscripciones();

  }

  ngDoCheck() {

    this.identity = this._usuarioService.getIdentity();
  }

  getUbicaciones() {
    this._ubicacionService.getUbicaciones(this.token, 1).subscribe(
      (response) => {
        if (response.ubicaciones) {
          this.ubicaciones = response.ubicaciones;
          this.status = 'success';
          console.log(this.ubicaciones);
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.status = 'error';
      }
    );
  }

  getJornadas() {
    this._jornadaService.getJornadas(this.token, 1).subscribe(
      (response) => {
        if (response.jornadas) {
          this.jornadas = response.jornadas;
          this.status = 'success';
          console.log(this.jornadas);
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.status = 'error';
      }
    );
  }

  getOfertas() {
    this._ofertaService.getOfertas(this.token, 1).subscribe(
      (response) => {
        if (response.ofertas) {
          this.ofertas = response.ofertas;
          this.status = 'success';
          console.log(this.ofertas);
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.status = 'error';
      }
    );
  }


  misInscripciones() {
    this._inscripcionService.getInscripcionesByUser(this.token, 1, this.identity._id).subscribe(
      (response) => {
        if (response) {
         this.inscripcionesArray = response.inscripciones;
         console.log("Inscripciones recogidas con exito");

         this.inscripcionesArray.forEach((inscripcion) => {
            console.log(inscripcion.oferta._id);
            this.listaIdOfertas.push(inscripcion.oferta._id);
           
         });
          
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.status = 'error';
      }
    );
  }

  deleteInscripcion(idInscripcion){
    //Preguntamos al usuario si desea eliminar la inscripcion
    var respuesta = window.confirm("¿Esta seguro de eliminar esta inscripcion?");
   
    //Si la respuesta es si
    if(respuesta){ //Llamamos al servicio, elimamos y recargamos
      this._inscripcionService.deleteInscripcion(this.token, idInscripcion).subscribe(
        response => {
          window.location.reload();
        },

        error => {
          console.log(<any>error);
        }
      );
    }
  }

 

}
