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
  public token;
  public editable;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //Metodo para guardar oferta en la BD
   saveOferta(oferta: Oferta, token): Observable<any>{ //Esto devuelve un observable
      let params = JSON.stringify(oferta); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json') //Indicamos el tipo de cabecera
                                      .set('Authorization', token); 
      
      //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
      //le pasamos los parametrosv del form y las cabeceras
      return this._http.post(this.url+'ofertaAdmin', params, {headers: headers});
   }

   updateOferta(oferta: Oferta, token): Observable<any> {
      let params = JSON.stringify(oferta); //Obtenemos datos del form y los convertimos en js
      let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', token);
    console.log("OFERTA QUE LLEGA AL SERVICIO:");
    console.log(oferta._id);
                               //Peticion HTTP y devolver el resultado
    return this._http.put(this.url+'update-oferta/'+oferta._id, params, {headers:headers});

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
  getOferta(token, ofertaId): Observable<any> {
    let headers = new HttpHeaders()
                  .set('Content-Type', 'application/json')
                  .set('Authorization', token);

    return this._http.get(this.url + 'oferta/'+ofertaId , {headers: headers });
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

  //Metodo para pedir peticion HTTP al API y obtener publicaciones
  getOfertasByUser(token, page = 1, userId): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'misOfertas/'+userId, {
      headers: headers,
    });
  }


}
