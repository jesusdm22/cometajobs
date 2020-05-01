import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  inscribirse(token, oferta): Observable<any> {
    var params = JSON.stringify(oferta); //Pasamos el objeto que nos llega a JSOn
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'inscripcion', params, {
      headers: headers,
    });
  }

  deleteInscripcion(token, inscripcionId){
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                                   .set('Authorization', token);

    return this._http.delete(this.url+'inscripcion/'+inscripcionId, {headers:headers}); //Llamada a la URL de la API

  }


   //Metodo para pedir peticion HTTP al API y obtener las inscripciones
   getInscripciones(token, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'inscripciones/', {
      headers: headers,
    });
  }

  getInscripcion(token, inscripcionId) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);

      return this._http.get(this.url + 'inscripcion/'+inscripcionId, {headers: headers});
  }

   //Metodo para pedir peticion HTTP al API y obtener publicaciones
   getInscripcionesByUser(token, page = 1, userId): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'misInscripciones/', {
      headers: headers,
    });
  }

}