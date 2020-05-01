import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../services/oferta.service';
import { UsuarioService } from '../services/usuario.service';
import { GLOBAL } from '../services/global';
import { Observable } from 'rxjs/Observable';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [UsuarioService, OfertaService]
})
export class OfertaComponent implements OnInit {
  
  public url;
  public identity;
  public token;
  public status;
  public user;
  public oferta;

  constructor(private _usuarioService: UsuarioService, private _ofertaService: OfertaService,
               private  _router: Router, private _route: ActivatedRoute) { 
    this.url = GLOBAL.url;
    this.user = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();

  }

  ngOnInit(): void {
    this.loadPage();
   
  }

  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getOferta(id);
    });
  }


  getOferta(idOferta){
    this._ofertaService.getOferta(this.token, idOferta).subscribe(
     
      response =>{
          if(response.oferta){ //Tenemos respuesta
              this.oferta = response.oferta;
          } else { //Error
            this.status = 'error';
          }
      },
      error =>{ // Si hay un error de escritura en URL redirigimos a error
        this._router.navigate(['/error']);
      }
    );
  }

}
