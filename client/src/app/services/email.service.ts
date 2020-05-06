import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public url;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }


  sendMail(mail): Observable<any> {
    var params = JSON.stringify(mail); //Pasamos el objeto que nos llega a JSOn
    let headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this._http.post(this.url + 'sendMail', params, { headers: headers });
  }

  
}
