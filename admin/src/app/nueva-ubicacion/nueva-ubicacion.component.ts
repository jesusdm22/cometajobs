import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionService } from '../services/ubicacion.service';
import { GLOBAL } from '../services/global';
import { Ubicacion } from '../models/ubicacion';

@Component({
  selector: 'app-nueva-ubicacion',
  templateUrl: './nueva-ubicacion.component.html',
  styleUrls: ['./nueva-ubicacion.component.css'],
})
export class NuevaUbicacionComponent implements OnInit {
  public title: string;
  public status: string;
  public ubicacion: Ubicacion;
  public url: string;
  public identity;
  public token;

  constructor( private _usuarioService: UsuarioService, private _ubicacionService: UbicacionService, private _route: ActivatedRoute,
                private _router: Router
  ) {
    this.title = 'Nueva ubicacion';
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.ubicacion = new Ubicacion('', '');
  }

  ngOnInit(): void {
    this.identity = this._usuarioService.getIdentity();
  }


  onSubmit(form):void {
    this._ubicacionService.saveUbicacion(this.ubicacion, this.token).subscribe( //Usamos el servicio para registrar la ubicacion
      response => {// Si hay respuesta
        
          this.status = 'success';//Esta variable es para mostrar un mensaje en la pagina de registro
          form.reset(); // Reseteamos el form
          console.log(response);
          this._router.navigate(['/ubicaciones']);
      }, 
      error => { // Si hay algun error lo mostramos por consola
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }
}
