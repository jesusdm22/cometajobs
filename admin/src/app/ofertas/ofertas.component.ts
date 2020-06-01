import { Component, OnInit, DoCheck } from '@angular/core';
import { OfertaService } from '../services/oferta.service';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [UsuarioService, OfertaService]
})
export class OfertasComponent implements OnInit, DoCheck {

  public title;
  public identity;
  public url;
  public status;
  public ofertas;
  public token;
  public elemento;

  constructor(private _usuarioService: UsuarioService, private _ofertaService: OfertaService, private _router: Router) {
    this.title = "Ofertas";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.getOfertas();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
}
   }

  ngOnInit(): void {
    console.log("Ofertas cargado!");
    this.identity = this._usuarioService.getIdentity();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
}
    this.getOfertas();
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }


  getOfertas(){
    this._ofertaService.getOfertas(this.token).subscribe(

      response => {

        if(response.ofertas){
          this.ofertas = response.ofertas;
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
  deleteOferta(){
    this._ofertaService.deleteOferta(this.token, sessionStorage.getItem('idEliminar')).subscribe(
      response =>{
            this.ngOnInit();
            sessionStorage.removeItem('idEliminar'); //Limpiamos la variable de sesion
            document.getElementById('cerrar').click();//Cerramos el modal
      },
      error => {
        console.log(<any>error);
        window.alert("Error al borrar la oferta");
      }
    );

}

//Funcion que llamaremos desde el boton de eliminar de cada fila
getIdOferta(idOferta){
  //Lanzamos el modal
  document.getElementById("lanzar").click();
 
  //Obtenemos el nombre de la oferta
  this._ofertaService.getOferta(this.token, idOferta).subscribe(
    response => {
      this.elemento = response.oferta.titulo;
    }
  )
  //Guardamos el elemento en una variabla de sesion
  sessionStorage.setItem('idEliminar', idOferta);
  
  //Una vez seteado el id a eliminar, llamaremos a la funcion de eliminar desde los botones de eliminar
}
// --------------------------------------------------------------------- --------------------------------

  editarOferta(idOferta){
    this._router.navigate(['/editar-oferta/', idOferta]);
  }

  agregarOferta(){
    this._router.navigate(['/nueva-oferta']);
  }

}
