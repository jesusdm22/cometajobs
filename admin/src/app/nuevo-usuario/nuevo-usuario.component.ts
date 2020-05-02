import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
  providers: [UsuarioService]
})
export class NuevoUsuarioComponent implements OnInit {

  public title: string;
  public status: string;
  public usuario:Usuario;
  public url: string;
  public identity;
  public token;

  constructor(private _usuarioService: UsuarioService, private _route: ActivatedRoute, private _router: Router ) {
    
    this.title = 'Nueva oferta';
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.usuario = new Usuario("","","","","","","","","", "", "");
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(form):void {
    this._usuarioService.register(this.usuario).subscribe( //Usamos el servicio para registrar al usuario
      response => {// Si hay respuesta
        
          this.status = 'success';//Esta variable es para mostrar un mensaje en la pagina de registro
          form.reset(); // Reseteamos el form
          console.log(response);
          this._router.navigate(['/usuarios']);
      }, 
      error => { // Si hay algun error lo mostramos por consola
        console.log(<any>error);
      }
    );
  }

}
