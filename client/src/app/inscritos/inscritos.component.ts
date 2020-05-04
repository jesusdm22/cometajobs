import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionService } from '../services/inscripcion.service';
import { Oferta } from '../models/oferta';
import { Inscripcion } from '../models/inscripcion';
import { Usuario } from '../models/usuario';
import { OfertaService } from '../services/oferta.service';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css']
})
export class InscritosComponent implements OnInit {

  public url;
  public identity;
  public token;
  public status;
  public user;
  public oferta;
  public usuarios;
  public inscripciones;
  public usuariosInscritos;

  constructor(private _usuarioService: UsuarioService, private _inscripcionService: InscripcionService,
    private  _router: Router, private _route: ActivatedRoute, private _ofertaService: OfertaService) {
      this.identity = _usuarioService.getIdentity();
      this.token = _usuarioService.getToken();
      this.url = GLOBAL.url;

      //Si no hay sesion ni eres empresa redirigimos al login
      if(!this.identity || this.identity.acceso != '2'){
      this._router.navigate(['/login']);
      }
   

      this.getOferta(_route.snapshot.paramMap.get('id'));
      this.getListaInscritos(_route.snapshot.paramMap.get('id'));
     }

  ngOnInit(): void {
    this.identity = this._usuarioService.getIdentity();
    this.getOferta(this._route.snapshot.paramMap.get('id'));
    this.getListaInscritos(this._route.snapshot.paramMap.get('id'));

  }


  getOferta(idOferta){
    this._ofertaService.getOferta(this.token, idOferta).subscribe(
      response => {
        this.oferta = response.oferta;
      }
    )

  }

  getListaInscritos(idOferta){
    
    //Obtenemos las inscripciones
    this._inscripcionService.getInscritos(this.token, idOferta).subscribe(
      response => {
            this.usuariosInscritos = response.inscripciones;
           
      },

      error => {
        console.log(<any>error);
      }
    );


  }

}
