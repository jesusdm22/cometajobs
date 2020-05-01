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

  constructor(private _usuarioService: UsuarioService, private _router: Router) { 
    this.title = "Usuarios";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
   
    //Si no hay sesion redirigimos al login
    if(!this.identity){
      this._router.navigate(['']);
    }

    console.log("Usuarios cargado!");
    this.getUsuarios();
  }

  ngDoCheck() {
    this.identity = this._usuarioService.getIdentity();
  }



  getUsuarios(){
    this._usuarioService.getUsers(1).subscribe(
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


  deleteUsuario(idUsuario){

    var eliminar = window.confirm("Estas seguro de querer eliminar este usuario?");

    if(eliminar) {
      this._usuarioService.deleteUser(idUsuario).subscribe(
        response =>{
  
          if(eliminar){
            window.alert("Usuario borrado con exito");
            this.ngOnInit(); 
          }  
        },
        error => {
          console.log(<any>error);
          window.alert("Error al borrar el usuario");
        }
      );
    } 
  }

  editarUsuario(idUsuario){
    this._router.navigate(['/editar-usuario/', idUsuario]);
  }

  agregarUsuario(){
    this._router.navigate(['/nuevo-usuario']);
  }

}
