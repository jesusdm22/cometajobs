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
import { Form } from '@angular/forms';
import { Inscripcion } from '../models/inscripcion';
import { Usuario } from '../models/usuario';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [
    UsuarioService,
    UbicacionService,
    JornadaService,
    OfertaService,
    InscripcionService
  ]
})
export class OfertasComponent implements OnInit, DoCheck {

  public url;
  public identity;
  public token;
  public status;
  public mensaje;
  public ubicaciones: Ubicacion[];
  public jornadas: Jornada[];
  public inscripcionesArray;
  public ofertas;
  public user: Usuario;
  public listaIdOfertas = [];
  public resultados;
  public initForm 

  constructor(private _usuarioService: UsuarioService,
    private _ubicacionService: UbicacionService,
    private _jornadaService: JornadaService,
    private _ofertaService: OfertaService,
    private _inscripcionService: InscripcionService, 
    private _router: Router)
    {
        this.url = GLOBAL.url;
        this.identity = this._usuarioService.getIdentity();
        this.token = this._usuarioService.getToken();
        this.status = "warning";
        this.mensaje = "Realiza una busqueda!";

        //Si no hay sesion ni eres usuario redirigimos al login
      if(!this.identity || this.identity._id != this.user._id){
        this._router.navigate(['/login']);
      }
        
     }

  ngOnInit(): void {
    this.getUbicaciones();
    this.getJornadas();
    this.misInscripciones();
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
    this.misInscripciones();
  }


  getUbicaciones() {
    this._ubicacionService.getUbicaciones(this.token, 1).subscribe(
      (response) => {
        if (response.ubicaciones) {
          this.ubicaciones = response.ubicaciones;
          console.log(this.ubicaciones);
        } else {
          this.mensaje = 'Error al obtener las ubicaciones';
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.mensaje = 'Error al obtener las ubicaciones';
        this.status = 'error';
      }
    );
  }

  getJornadas() {
    this._jornadaService.getJornadas(this.token, 1).subscribe(
      (response) => {
        if (response.jornadas) {
          this.jornadas = response.jornadas;
          console.log(this.jornadas);
        } else {
          this.mensaje = 'Error al obtener las jornadas';
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.mensaje = 'Error al obtener las jornadas';
        this.status = 'error';
      }
    );
  }

  misInscripciones() {
    this._inscripcionService.getInscripcionesByUser(this.token, 1, this.identity._id).subscribe(
      (response) => {
        if (response) {
          
         this.inscripcionesArray = response.inscripciones;
         this.inscripcionesArray.forEach((inscripcion) => {
            console.log(inscripcion.oferta._id);
            this.listaIdOfertas.push(inscripcion.oferta._id);
           
         });
          
        } else {
          this.mensaje = 'Error al obtener las inscripciones del usuario';
          this.status = 'error';
        }
      },
      (err) => {
        console.log(<any>err);
        this.mensaje = 'Error al las inscripciones del usuario';
          this.status = 'error';
      }
    );
  }
  

  inscribirse(idOferta) {
    var nuevaInscripcion = new Inscripcion('', this.identity._id, idOferta);

    this._inscripcionService.inscribirse(this.token, nuevaInscripcion).subscribe(
        response => {
          console.log('Inscripcion realizada con exito');
          response.inscripciones;
          //window.location.reload();
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }


  onSubmit(form){
    var texto = form.value.titulo;
    var ubicacion = form.value.ubicacion;
    var jornada = form.value.jornada;

    this._ofertaService.searchOfertas(form.value).subscribe(
      response => {
        this.resultados = response.resultado;
        this.status = 'success';
        if(this.resultados.length == 1)
          this.mensaje = 'Su busqueda obtuvo ' + this.resultados.length + ' resultado';
        else
          this.mensaje = 'Su busqueda obtuvo ' + this.resultados.length + ' resultados';
        
        if(response.resultado.length <= 0){
          this.mensaje = 'Su busqueda no obtuvo ningun resultado';
          this.status = "error";
        }
         
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
