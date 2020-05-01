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

  constructor(private _usuarioService: UsuarioService, private _jornadaService: JornadaService, private _router: Router) { 
    this.title = "Jornadas";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.getJornadas();
  }

  ngOnInit(): void {
    console.log("Jornadas cargado!");
    this.identity = this._usuarioService.getIdentity();
    this.getJornadas();
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

  deleteJornada(idJornada){
    var eliminar = window.confirm("Estas seguro de querer eliminar esta oferta?");

    //Si queremos eliminar
    if(eliminar){
      this._jornadaService.deleteJornada(this.token, idJornada).subscribe(
        response =>{
              window.alert("Jornada borrada con exito");
              this.ngOnInit();
        },
        error => {
          console.log(<any>error);
          window.alert("Error al borrar la jornada");
        }
      );
    }
    
  }

  editarJornada(idJornada){
    this._router.navigate(['/editar-jornada/', idJornada]);
  }

  agregarJornada(){
    this._router.navigate(['/nueva-jornada']);
  }

}
