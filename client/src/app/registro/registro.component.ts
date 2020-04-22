//Dependencias..modelos etc
import { Component, OnInit } from '@angular/core';
import { Router, Params} from '@angular/router';
import { Usuario } from '../models/usuario';
import { Form } from '@angular/forms';
//Importamos el servicio de usuario
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public title:string;
  public user: Usuario;
  public status: string;

  constructor(private _usuarioService: UsuarioService) { //Creamos el servicio 
    this.title = 'Registrate';
    this.user = new Usuario( "", "", "", "", "", "", "3", "", "" );
  }

  ngOnInit(): void {
  }

   //Metodo que recoge los datos del formulario
  //Recibe el formulario para poder resetear sus campos
  onSubmit(form):void {
    this._usuarioService.register(this.user).subscribe( //Usamos el servicio para registrar al usuario
      response => {// Si hay respuesta
        if(response.user && response.user._id){ //Y nos llega el usuario y su id
          this.status = 'success';//Esta variable es para mostrar un mensaje en la pagina de registro
          form.reset(); // Reseteamos el form
        } else {
          this.status = 'error';
        }
      }, 
      error => { // Si hay algun error lo mostramos por consola
        console.log(<any>error);
      }
    );
}

}
