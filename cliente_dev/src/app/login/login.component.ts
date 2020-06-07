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
  }

  onSubmit(){
    //Loguear al user y conseguir datos
    this._usuarioService.signIn(this.user).subscribe(
       response => {
         
         this.identity = response.user;
         if(!this.identity || !this.identity._id){
           this.status = 'error';
         }else {

          if(this.identity.acceso == '0'){
            this._router.navigate(['/error']);
          } else {
            this.status = 'success';
            //Obtener el token
            console.log(this.identity);
            //Persistir datos del usuario
            localStorage.setItem('identity', JSON.stringify(this.identity));
            
            this.getToken(); //Llamada a la funcion que obtiene el token
            console.log(localStorage.getItem('token'));
            this._router.navigate(['/home']);
          }
           
          
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
