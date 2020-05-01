import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public url: string;
  public identity;
  public token;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
   }


   //Metodo para iniciar sesion y comprobar el token
   signIn(user: Usuario, gettoken = null): Observable<any>{

      if(gettoken != null) { //Comprobamos que nos llega el token y lo asignamos
        user.gettoken = gettoken 
      }

      let params =  JSON.stringify(user); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Indicamos el tipo de cabecera

      return this._http.post(this.url+'login', params, {headers: headers});
   }


   //Metodo para obtener desde localstorage los datos de user logueado
   getIdentity() {
     let identity = JSON.parse(localStorage.getItem('identity')); //Parseamos de string a objeto JS

     if(identity != undefined){ // Si la identity NO es indefinida, la asignamos
       this.identity = identity;
     } else { // Si no, es nula
       this.identity = null;
     }

     return this.identity; // La devolvemos
   }

    //Metodo para guardar al usuario en la BD
    register(user: Usuario): Observable<any>{ //Esto devuelve un observable
      let params = JSON.stringify(user); // Convertimos el JSON a string (todos los parametros que nos llegan)
      let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Indicamos el tipo de cabecera
      
      //Devolvemos la respuesta haciendo una llamada por post usando la URL configurada en global.ts, 
      //le pasamos los parametrosv del form y las cabeceras
      return this._http.post(this.url+'registrar', params, {headers: headers});
   }


   //Metodo para obtener desde localstorage el token de user logueado
   getToken() {
    let local = localStorage.getItem('token');
    let token = JSON.stringify(local); //Parseamos de string a objeto JS
  
    if(token != undefined){ // Si el token NO es indefinido, lo asignamos
      this.token = token;
    } else { // Si no, es nulo
      this.token = null;
    }

    return this.token; // Lo devolvemos
  }

  
  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));
    
    if(stats != 'undefined')
      stats = stats;
    else 
      stats = null;

    return stats;
  } 

 /* getCounters(userId = null): Observable<any>{
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());
                                    
    if(userId != null)
      return this._http.get(this.url+'counters/'+userId, {headers:headers});
    else 
      return this._http.get(this.url+'counters', {headers:headers});
  } */

  updateUser(user: Usuario): Observable<any> {
    let params = JSON.stringify(user); //Obtenemos datos del form y los convertimos en js
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', this.getToken());
    
                               //Peticion HTTP y devolver el resultado
    return this._http.put(this.url+'update-user/'+user._id, params, {headers:headers});

  }

  //Metodo para devolver usuarios
  getUsers(page = null):Observable<any> {

    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', this.token);

    return this._http.get(this.url+'usuarios/'+page, {headers:headers});
  }


  getEmpresas(page=null):Observable<any> {

    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                                   .set('Authorization', this.token);

    return this._http.get(this.url+'empresas/'+page, {headers:headers});
  }

  getCandidatos(page=null):Observable<any> {

    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                                   .set('Authorization', this.token);

    return this._http.get(this.url+'candidatos/'+page, {headers:headers});
  }


  //Metodo para devolver 1 1usuario
  getUser(id):Observable<any> {

    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', this.getToken());

    return this._http.get(this.url+'usuario/'+id, {headers:headers});
  }

  deleteUser(id):Observable<any> {
    //Cabeceras http
    let headers = new HttpHeaders().set('Content-Type', 'application/json') //Cabeceras
                               .set('Authorization', this.getToken());

    return this._http.delete(this.url+'usuario/'+id, {headers:headers});
  }
}
