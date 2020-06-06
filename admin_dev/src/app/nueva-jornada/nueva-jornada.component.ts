import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionService } from '../services/ubicacion.service';
import { JornadaService } from '../services/jornada.service';
import { GLOBAL } from '../services/global';
import { Jornada } from '../models/jornada';

@Component({
  selector: 'app-nueva-jornada',
  templateUrl: './nueva-jornada.component.html',
  styleUrls: ['./nueva-jornada.component.css']
})
export class NuevaJornadaComponent implements OnInit {

  public title: string;
  public status: string;
  public jornada: Jornada;
  public url: string;
  public identity;
  public token;

  constructor( private _usuarioService: UsuarioService, private _jornadaService: JornadaService, private _route: ActivatedRoute,
                private _router: Router
  ) {
    this.title = 'Nueva ubicacion';
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.jornada = new Jornada('', '', '');
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.identity = this._usuarioService.getIdentity();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    }
  }



  onSubmit(form):void {
    this._jornadaService.saveJornada(this.jornada, this.token).subscribe( //Usamos el servicio para registrar la jornada
      response => {// Si hay respuesta
          this.status = 'success';//Esta variable es para mostrar un mensaje en la pagina de registro
          form.reset(); // Reseteamos el form
          console.log(response);
          this._router.navigate(['/jornadas']);

      }, 
      error => { // Si hay algun error lo mostramos por consola
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

}
