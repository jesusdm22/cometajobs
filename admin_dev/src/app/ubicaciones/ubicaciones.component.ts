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
  public elemento;
  public continuar = false;

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

//PARA BORRAR ---------------------------------------------------------------------

  //Funcion que obtiene de la sesion el id a eliminar, y lo eliminar
  //Esta funcion solo se ejecuta si se clica 'Si' en el modal
  deleteUbicacion(){
      this._ubicacionService.deleteUbicacion(this.token, sessionStorage.getItem('idEliminar')).subscribe(
        response =>{
              this.ngOnInit();
              sessionStorage.removeItem('idEliminar'); //Limpiamos la variable de sesion
              document.getElementById('cerrar').click();//Cerramos el modal
        },
        error => {
          console.log(<any>error);
          window.alert("Error al borrar la ubicacion");
        }
      );
  
  }

  //Funcion que llamaremos desde el boton de eliminar de cada fila
  getIdUbicacion(idUbicacion){
    //Lanzamos el modal
    document.getElementById("lanzar").click();
   
    //Obtenemos el nombre de la ubicacion
    this._ubicacionService.getUbicacion(this.token, idUbicacion).subscribe(
      response => {
        this.elemento = response.ubicacion.ubicacion;
      }
    )
    //Guardamos el elemento en una variabla de sesion
    sessionStorage.setItem('idEliminar', idUbicacion);
    
    //Una vez seteado el id a eliminar, llamaremos a la funcion de eliminar desde los botones de eliminar
  }
 // --------------------------------------------------------------------- --------------------------------

  editarUbicacion(idUbicacion){
    this._router.navigate(['editar-ubicacion/', idUbicacion]);
  }

  agregarUbicacion(){
    this._router.navigate(['nueva-ubicacion']);
  }

}
