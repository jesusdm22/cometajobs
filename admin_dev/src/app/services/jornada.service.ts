import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Jornada } from '../models/jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }

   //Metodo para guardar jornada en la BD
   saveJornada(jornada: Jornada, token): Observable<any>{ //Esto devuelve un observable
      let params = JSON.stringify(jornada); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json')//Indicamos el tipo de cabecera
                                      .set('Authorization', token);
      //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
      //le pasamos los parametrosv del form y las cabeceras
      return this._http.post(this.url+'jornada', params, {headers: headers});
   }


   updateJornada(jornada:Jornada, token): Observable<any>{ //Esto devuelve un observable
    let params = JSON.stringify(jornada); // Convertimos el JSON a string (todos los parametros que nos llegan)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token); //Indicamos el tipo de cabecera
    
                                    
    //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
    //le pasamos los parametrosv del form y las cabeceras
    return this._http.put(this.url+'jornada/'+jornada._id, params, {headers: headers});
 }



   //Metodo para pedir peticion HTTP al API y obtener jornadas
  getJornadas(token, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'jornadas/' + page, {
      headers: headers,
    });
  }


  //Metodo para pedir peticion HTTP al API y obtener jornada por ID
  getJornada(id, token):Observable<any> {
    
    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', token);

    return this._http.get(this.url+'jornada/'+id, {headers:headers});
  }


  //Metodo para pedir peticion HTTP al API y eliminar jornada
  deleteJornada(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'jornada/' + id, {
      headers: headers,
    });
  }


}
