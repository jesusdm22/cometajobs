import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Ubicacion } from '../models/ubicacion';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //Metodo para guardar ubicacion en la BD
   saveUbicacion(ubicacion: Ubicacion): Observable<any>{ //Esto devuelve un observable
      let params = JSON.stringify(ubicacion); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Indicamos el tipo de cabecera
      
      //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
      //le pasamos los parametrosv del form y las cabeceras
      return this._http.post(this.url+'ubicacion', params, {headers: headers});
   }



   //Metodo para pedir peticion HTTP al API y obtener ubicaciones
  getUbicaciones(token, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'ubicaciones/' + page, {
      headers: headers,
    });
  }


  //Metodo para pedir peticion HTTP al API y obtener ubicacion por ID
  getUbicacion(token, page = 1, ubicacionId): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'ubicacion/'+ubicacionId + '/' + page, {
      headers: headers,
    });
  }


  //Metodo para pedir peticion HTTP al API y eliminar ubicacion
  deleteUbicacion(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'ubicacion/' + id, {
      headers: headers,
    });
  }


}
