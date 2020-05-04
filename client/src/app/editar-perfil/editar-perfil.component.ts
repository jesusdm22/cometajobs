import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
  providers: [UsuarioService, UploadService]
})
export class EditarPerfilComponent implements OnInit {

  public title: string;
  public status: string;
  public user: Usuario;
  public url : string;
  public identity;
  public token;

  constructor(private _usuarioService: UsuarioService, private _router: Router, private _uploadService: UploadService) {
    this.title = 'Actualizar perfil';
    this.user = this._usuarioService.getIdentity();
    this.identity = this.user;
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;

  //Si no hay sesion ni eres usuario redirigimos al login
    if(!this.identity || this.identity.acceso != '3'){
      this._router.navigate(['/login']);
    }
   }

   ngOnInit(): void {
  }
  
  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }

  onSubmit(){
    //Llamamamos al metodo del servicio que realiza la actualizacion del usuario
    this._usuarioService.updateUser(this.user).subscribe(
      response => { //RESPUESTA
        if(!this.user){// Si no hay usuario
          this.status = 'error';
        } else { // Si hay usuario
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user)); // Actualizamos en localstorage
          this.identity = this.user; //actualizamos en codigo
          console.log(this.user);
          //Y la actualizacion de la base de datos ya se hizo

          //Subida de imagen de usuario
          this._uploadService.makeFileRequest(this.url+'update-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
          .then((result:any) => {
            console.log(result);
            this.user.imagen = result.user.image;
            localStorage.setItem('identity', JSON.stringify(this.user));
          });

        }
      },
      error => { //ERROR
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) { //Funcion que captura la imagen seleccionada en un input del form
    this.filesToUpload = <Array<File>>fileInput.target.files; //Le adjuntamos la imagen al array
    console.log(this.filesToUpload);
  }

}
