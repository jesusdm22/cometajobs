import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit, DoCheck {

  public title;
  public identity;
  public url;
  public status;
  public usuarios;
  public token;
  public elemento;

  constructor(private _usuarioService: UsuarioService, private _router: Router) { 
    this.title = "Usuarios";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
          this._router.navigate(['']);
    }

  }

  ngOnInit(): void {
   
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    } else {
      console.log("Usuarios cargado!");
      this.identity = this._usuarioService.getIdentity();
      this.token = this._usuarioService.getToken();
      this.getUsuarios();
    }

    
   
  }

  ngDoCheck() {
    this.identity = this._usuarioService.getIdentity();
  }



  getUsuarios(){
    this._usuarioService.getUsers().subscribe(
      response => {
        console.log(response);
        if(response){
          this.usuarios = response.users;
         
        } else {
          this.status = 'error';
          console.log("Error al traer los usuarios");
        }
      }, 
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }


  //PARA BORRAR ---------------------------------------------------------------------

  //Funcion que obtiene de la sesion el id a eliminar, y lo eliminar
  //Esta funcion solo se ejecuta si se clica 'Si' en el modal
  deleteUsuario(){
    this._usuarioService.deleteUser(sessionStorage.getItem('idEliminar')).subscribe(
      response =>{
            this.ngOnInit();
            sessionStorage.removeItem('idEliminar'); //Limpiamos la variable de sesion
            document.getElementById('cerrar').click();//Cerramos el modal
      },
      error => {
        console.log(<any>error);
        window.alert("Error al borrar el usuario");
      }
    );

}

//Funcion que llamaremos desde el boton de eliminar de cada fila
getIdUsuario(idUsuario){
  //Lanzamos el modal
  document.getElementById("lanzar").click();
 
  //Obtenemos el nombre del usuario
  this._usuarioService.getUser(idUsuario).subscribe(
    response => {
      this.elemento = response.oferta.titulo;
    }
  )
  //Guardamos el elemento en una variabla de sesion
  sessionStorage.setItem('idEliminar', idUsuario);
  
  //Una vez seteado el id a eliminar, llamaremos a la funcion de eliminar desde los botones de eliminar
}
// --------------------------------------------------------------------- --------------------------------

  editarUsuario(idUsuario){
    this._router.navigate(['/editar-usuario/', idUsuario]);
  }

  agregarUsuario(){
    this._router.navigate(['/nuevo-usuario']);
  }

}
