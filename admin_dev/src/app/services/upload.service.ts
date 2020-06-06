import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  public url: string;

  constructor() {
    this.url = GLOBAL.url;
  }

  makeFileRequest(
    url: string,
    params: Array<string>,
    files: Array<File>,
    token: string,
    name: string
  ) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData(); //Para recoger el formulario
      var xhr = new XMLHttpRequest(); //Para recoger los archivos desde JS con AJAX

      //For para recorrer el array de archivos
      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name); //Con esto agregamos al formulario los archivos con su nombre
      }

      //Peticion AJAX
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);

    });
  }
}
