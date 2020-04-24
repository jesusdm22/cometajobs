import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Oferta } from '../models/oferta';


@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //Metodo para guardar jornada en la BD
   saveOferta(oferta: Oferta): Observable<any>{ //Esto devuelve un observable
      let params = JSON.stringify(oferta); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Indicamos el tipo de cabecera
      
      //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
      //le pasamos los parametrosv del form y las cabeceras
      return this._http.post(this.url+'oferta', params, {headers: headers});
   }



   //Metodo para pedir peticion HTTP al API y obtener ofertas
  getOfertas(token, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'ofertas/' + page, {
      headers: headers,
    });
  }


  //Metodo para pedir peticion HTTP al API y obtener oferta por ID
  getOferta(token, page = 1, ofertaId): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'oferta/'+ofertaId + '/' + page, {
      headers: headers,
    });
  }


  //Metodo para pedir peticion HTTP al API y eliminar oferta
  deleteOferta(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'oferta/' + id, {
      headers: headers,
    });
  }


}
