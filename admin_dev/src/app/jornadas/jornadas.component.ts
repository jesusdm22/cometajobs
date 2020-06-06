import { Component, OnInit, DoCheck } from '@angular/core';
import { JornadaService } from '../services/jornada.service';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css'],
  providers: [UsuarioService, JornadaService]
})
export class JornadasComponent implements OnInit, DoCheck {

  public title;
  public identity;
  public url;
  public status;
  public jornadas;
  public token;
  public elemento;

  constructor(private _usuarioService: UsuarioService, private _jornadaService: JornadaService, private _router: Router) { 
    this.title = "Jornadas";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.getJornadas();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    }
  }

  ngOnInit(): void {
    console.log("Jornadas cargado!");
    this.identity = this._usuarioService.getIdentity();
    this.getJornadas();
    //Si no hay sesion redirigimos al login
    //|| this.identity.acceso != '1'
    if(!this.identity || this.identity.acceso != '1'){
      this._router.navigate(['']);
    }
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }

  getJornadas(){
    this._jornadaService.getJornadas(this.token).subscribe(

      response => {

        if(response.jornadas){
          this.jornadas = response.jornadas;
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
  deleteJornada(){
    this._jornadaService.deleteJornada(this.token, sessionStorage.getItem('idEliminar')).subscribe(
      response =>{
            this.ngOnInit();
            sessionStorage.removeItem('idEliminar'); //Limpiamos la variable de sesion
            document.getElementById('cerrar').click();//Cerramos el modal
      },
      error => {
        console.log(<any>error);
        window.alert("Error al borrar la jornada");
      }
    );

}

//Funcion que llamaremos desde el boton de eliminar de cada fila
getIdJornada(idJornada){
  //Lanzamos el modal
  document.getElementById("lanzar").click();
 
  //Obtenemos el nombre de la jornada
  this._jornadaService.getJornada(idJornada, this.token).subscribe(
    response => {
      this.elemento = response.jornada.jornada;
      //console.log(response);
    }
  )
  //Guardamos el elemento en una variabla de sesion
  sessionStorage.setItem('idEliminar', idJornada);
  
  //Una vez seteado el id a eliminar, llamaremos a la funcion de eliminar desde los botones de eliminar
}
// --------------------------------------------------------------------- --------------------------------

  editarJornada(idJornada){
    this._router.navigate(['/editar-jornada/', idJornada]);
  }

  agregarJornada(){
    this._router.navigate(['/nueva-jornada']);
  }

}
