import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../models/ubicacion';
import { UbicacionService } from '../services/ubicacion.service';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.component.html',
  styleUrls: ['./ubicaciones.component.css']
})
export class UbicacionesComponent implements OnInit {

  public title;
  public identity;
  public url;
  public status;
  public ubicaciones;
  public token;

  constructor(private _usuarioService: UsuarioService, private _ubicacionService:UbicacionService, private _router:Router) {
    this.title = "Ubicaciones";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.getUbicaciones();

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
    this.getUbicaciones();
  }


  getUbicaciones(){
    this._ubicacionService.getUbicaciones(this.token).subscribe(

      response => {

        if(response.ubicaciones){
          this.ubicaciones = response.ubicaciones;
        } else {
          this.status = 'error';
        }

      }, 

      error =>{
        console.log(<any>error);
        this.status = 'error';
      }

    );
  }


  deleteUbicacion(idUbicacion){
    var eliminar = window.confirm("Estas seguro de querer eliminar esta ubicacion?");

    //Si queremos eliminar
    if(eliminar){
      this._ubicacionService.deleteUbicacion(this.token, idUbicacion).subscribe(
        response =>{
              window.alert("Ubicacion borrada con exito");
              this.ngOnInit();
        },
        error => {
          console.log(<any>error);
          window.alert("Error al borrar la ubicacion");
        }
      );
    }
    
  }

  editarUbicacion(idUbicacion){
    this._router.navigate(['editar-ubicacion/', idUbicacion]);
  }

  agregarUbicacion(){
    this._router.navigate(['nueva-ubicacion']);
  }

}
