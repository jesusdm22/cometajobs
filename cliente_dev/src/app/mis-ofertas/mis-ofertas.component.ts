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
  selector: 'app-mis-ofertas',
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.css']
})
export class MisOfertasComponent implements OnInit {

  public url;
  public identity;
  public token;
  public status;
  public ubicaciones: Ubicacion[];
  public jornadas: Jornada[];
  public ofertasArray;
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

    //Si no hay sesion ni eres empresa redirigimos al login
    //|| this.identity.acceso != '2'
    if(!this.identity || this.identity.acceso != '2'){
      this._router.navigate(['/login']);
    }
  }
  

  ngOnInit(): void {
    this.identity = this._usuarioService.getIdentity();
    this.getUbicaciones();
    this.getJornadas();
    this.getOfertas();
    this.misOfertas();

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


  misOfertas() {
    this._ofertaService.getOfertasByUser(this.token, 1, this.identity._id).subscribe(
      (response) => {
        if (response) {
         
         this.ofertasArray = response.ofertas;
         console.log("Ofertas recogidas con exito");
         console.log(response.ofertas);

         this.ofertasArray.forEach((oferta) => {
            console.log(oferta._id);
            this.listaIdOfertas.push(oferta._id);
           
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

  deleteOferta(idOferta){
    //Preguntamos al usuario si desea eliminar la oferta
    var respuesta = window.confirm("¿Esta seguro de eliminar esta oferta?");


    //Si la respuesta es si
    if(respuesta){ //Llamamos al servicio, elimamos y recargamos
      this._ofertaService.deleteOferta(this.token, idOferta).subscribe(
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
