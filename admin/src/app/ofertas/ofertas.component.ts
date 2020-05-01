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

  constructor(private _usuarioService: UsuarioService, private _ofertaService: OfertaService, private _router: Router) {
    this.title = "Ofertas";
    this.url = GLOBAL.url;
    this.identity = _usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.getOfertas();
   }

  ngOnInit(): void {
    console.log("Ofertas cargado!");
    this.identity = this._usuarioService.getIdentity();
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

  deleteOferta(idOferta){
    var eliminar = window.confirm("Estas seguro de querer eliminar esta oferta?");

    //Si queremos eliminar
    if(eliminar){
      this._ofertaService.deleteOferta(this.token, idOferta).subscribe(
        response =>{
              window.alert("Oferta borrada con exito");
              this.ngOnInit();
        },
        error => {
          console.log(<any>error);
          window.alert("Error al borrar la oferta");
        }
      );
    }
    
  }

  editarOferta(idOferta){
    this._router.navigate(['/editar-oferta/', idOferta]);
  }

  agregarOferta(){
    this._router.navigate(['/nueva-oferta']);
  }

}
