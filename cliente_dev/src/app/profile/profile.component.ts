import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionService } from '../services/ubicacion.service';
import { GLOBAL } from '../services/global';
import { Observable } from 'rxjs/Observable';
import { Router, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsuarioService, UbicacionService]
})
export class ProfileComponent implements OnInit {

  public url;
  public identity;
  public token;
  public status;
  public user;

  constructor(private _usuarioService: UsuarioService, private _ubicacionService: UbicacionService,
              private _route: ActivatedRoute, private _router: Router) { 

    this.url = GLOBAL.url;
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    

  }

  ngOnInit(): void {
    this.loadPage();
    this.identity = this._usuarioService.getIdentity();
  }

  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
    });
  }

  getUser(idUsuario){
    this._usuarioService.getUser(idUsuario).subscribe(
      response =>{
          if(response.user){ //Tenemos respuesta
              this.user = response.user;
          } else { //Error
            this.status = 'error';
          }
      },
      error =>{ // Si hay un error de escritura en URL redirigimos a error
        //this._router.navigate(['/error']);
      }
    );
  }

  editarUsuario(idUsuario){
    this._router.navigate(['/editar-usuario/', idUsuario]);
    console.log("click");
  }

}
