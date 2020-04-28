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
  selector: 'app-nueva-oferta',
  templateUrl: './nueva-oferta.component.html',
  styleUrls: ['./nueva-oferta.component.css'],
  providers: [OfertaService, JornadaService, UbicacionService],
})
export class NuevaOfertaComponent implements OnInit {
  
  public title: string;
  public status: string;
  public oferta:Oferta;
  public url: string;
  public identity;
  public token;
  public ubicaciones: Ubicacion[];
  public jornadas: Jornada[];

  constructor( private _ofertaService: OfertaService, private _usuarioService: UsuarioService, private _jornadaService: JornadaService,
    private _ubicacionService: UbicacionService, private _route: ActivatedRoute, private _router: Router ) {
    
    this.title = 'Nueva oferta';
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.oferta = new Oferta("","","","","","","","","");
  }

  ngOnInit(): void {
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

  onSubmit(form):void {
    this._ofertaService.saveOferta(this.oferta, this.token).subscribe( //Usamos el servicio para registrar la oferta
      response => {// Si hay respuesta
        if(response.oferta && response.oferta.titulo && response.oferta.jornada && response.oferta.ubicacion){ //Y nos llega el usuario y datos
          this.status = 'success';//Esta variable es para mostrar un mensaje en la pagina de registro
          form.reset(); // Reseteamos el form
          this._router.navigate(['/profile/', this.identity._id]);
        } else {
          this.status = 'error';
        }
      }, 
      error => { // Si hay algun error lo mostramos por consola
        console.log(<any>error);
      }
    );
  }
}
