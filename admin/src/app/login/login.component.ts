import { Component, OnInit } from '@angular/core';
import { Router, Params} from '@angular/router';
import { Usuario } from '../models/usuario';
import { Form } from '@angular/forms';
import { UsuarioService} from '../services/usuario.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public title:string;
  public user:Usuario;
  public status:string;
  public identity;
  public token;
  
  constructor(private _usuarioService:UsuarioService, private _router: Router) { 
    this.title = 'Identificate';
    this.user = new Usuario( "", "", "", "", "", "","", "3", "", "", "" );
  }

  ngOnInit(): void {
    console.log("login cargado")!
  }

  onSubmit(){
    //Loguear al user y conseguir datos
    this._usuarioService.signIn(this.user).subscribe(
       response => {
         
        // Si el usuario tiene acceso 1, entonces establecemos la identidad
        if(response.user.acceso && response.user.acceso == '1'){
          this.identity = response.user;
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken(); //Llamada a la funcion que obtiene el token
          this._router.navigate(['/usuarios']);
        } else { // Si no
          this.status = 'error';
        }
        
       },
       error => {
         console.log(error);
         if(<any>error != null)
           this.status = 'error';
       }
    );
   }

     //Funcion para obtener el toekn
  getToken(){
    this._usuarioService.signIn(this.user, 'true').subscribe(
      response => {
        
        this.token = response.token;
        console.log(this.token);

        if(this.token <= 0){
          this.status = 'error';
        }else {
         
          this.status = 'success';
          //Persistir TOKEN
          localStorage.setItem('token', this.token);
          //this.getCounters(); Obtenemos los contadores
         
        }
         
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null)
          this.status = 'error';
      }
   );
  }

}
