import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Jornada } from '../models/Jornada';
import { JornadaService } from '../services/jornada.service';


@Component({
  selector: 'app-editar-jornada',
  templateUrl: './editar-jornada.component.html',
  styleUrls: ['./editar-jornada.component.css']
})
export class EditarJornadaComponent implements OnInit, DoCheck {

  public title: string;
  public status: string;
  public jornada: Jornada;
  public url : string;
  public identity;
  public token;

  constructor(private _usuarioService: UsuarioService, private _router: Router, private _jornadaService: JornadaService,
    private _route: ActivatedRoute) {
      this.title = 'Editar jornada';
      this.identity = this._usuarioService.getIdentity();
      this.token = this._usuarioService.getToken();
      this.url = GLOBAL.url;


        //Asignamos la jornada en el que hemos clicado 
      _jornadaService.getJornada(_route.snapshot.paramMap.get('id'), this.token).subscribe(
        response => {
            this.jornada = response.jornada;
        }
      );
     }

  ngOnInit(): void {
    this.identity = this._usuarioService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }


  onSubmit(){
    //Llamamamos al metodo del servicio que realiza la actualizacion del usuario
    this._jornadaService.updateJornada(this.jornada, this.token).subscribe(
      response => { //RESPUESTA
        this.status = 'success';
        this._router.navigate(['/jornadas']);
      },
      error => { //ERROR
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
