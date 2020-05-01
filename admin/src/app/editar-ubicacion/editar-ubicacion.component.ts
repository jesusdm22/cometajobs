import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';
import { Ubicacion } from '../models/ubicacion';
import { UbicacionService } from '../services/ubicacion.service';


@Component({
  selector: 'app-editar-ubicacion',
  templateUrl: './editar-ubicacion.component.html',
  styleUrls: ['./editar-ubicacion.component.css']
})
export class EditarUbicacionComponent implements OnInit {

  public title: string;
  public status: string;
  public ubicacion: Ubicacion;
  public url : string;
  public user:Usuario;
  public identity;
  public token;

  constructor(private _usuarioService: UsuarioService, private _router: Router, private _ubicacionService: UbicacionService,
              private _route: ActivatedRoute) {
    this.title = 'Actualizar ubicacion';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;

    //Asignamos la ubicacion en el que hemos clicado 
    _ubicacionService.getUbicacion(this.token, _route.snapshot.paramMap.get('id')).subscribe(
      response => {
          this.ubicacion = response.ubicacion;
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
    this._ubicacionService.updateUbicacion(this.ubicacion, this.token).subscribe(
      response => { //RESPUESTA
        this.status = 'success';
        this._router.navigate(['/ubicaciones']);
      },
      error => { //ERROR
        this.status = 'error';
      }
    );
  }



}
