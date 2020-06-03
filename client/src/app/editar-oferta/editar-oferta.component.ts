import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Oferta } from '../models/oferta';
import { Jornada } from '../models/jornada';
import { Ubicacion } from '../models/ubicacion';
import { OfertaService } from '../services/oferta.service';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { JornadaService } from '../services/jornada.service';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css'],
  providers: [OfertaService, JornadaService, UbicacionService]
})
export class EditarOfertaComponent implements OnInit {

  public title: string;
  public status: string;
  public oferta;
  public url : string;
  public identity;
  public token;
  public ubicaciones: Ubicacion[];
  public jornadas: Jornada[];

  constructor(private _ofertaService: OfertaService, private _usuarioService: UsuarioService, private _jornadaService: JornadaService,
              private _ubicacionService: UbicacionService, private _route: ActivatedRoute, private _router:Router) { 
    this.title = 'Actualizar oferta';
    this.token = this._usuarioService.getToken();
    this.identity = this._usuarioService.getIdentity();
    this.url = GLOBAL.url;

    //Si no hay sesion ni eres empresa redirigimos al login
    //|| this.identity.acceso != '2'
    //Si no hay sesion ni eres usuario redirigimos al login
    if(!this.identity || this.identity.acceso != '2'){
      this._router.navigate(['/login']);
    }
    
    //Asignamos la oferta en la que hemos clicado 
    _ofertaService.getOferta(this.token, _route.snapshot.paramMap.get('id')).subscribe(
      response => {
          this.oferta = response;
      }
    );
    
  }

  ngOnInit(): void {
  this.identity = this._usuarioService.getIdentity();
   this.getJornadas();
   this.getUbicaciones();
  }


  getUbicaciones() {
    this._ubicacionService.getUbicaciones(this.token, 1).subscribe(
      (response) => {
        if (response.ubicaciones) {
          this.ubicaciones = response.ubicaciones;
          console.log(this.ubicaciones);
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
        } 
      },
      (err) => {
        console.log(<any>err);
      }
    );
  }




  onSubmit(){
    //Llamamamos al metodo del servicio que realiza la actualizacion del usuario
    this._ofertaService.updateOferta(this.oferta.oferta, this.token).subscribe(
      response => { //RESPUESTA
        if(!this.oferta.oferta){// Si no hay oferta
          this.status = 'error';
        } else { // Si hay oferta
          this.status = 'success';
          this._router.navigate(['/profile/', this.identity._id]);

        }
      },
      error => { //ERROR
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }


}
