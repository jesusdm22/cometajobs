import { Component, OnInit } from '@angular/core';
import {EmailService} from '../services/email.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [EmailService]
})
export class AboutComponent implements OnInit {

  public status;
  constructor(private _emailService:EmailService) {
    
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    var nombreCompleto = form.value.nombre + ' ' + form.value.apellidos;
    var asunto = form.value.asunto;
    var mensaje = form.value.mensaje;

    if(form.value.nombre && form.value.apellidos && form.value.asunt && form.value.mensaje){
      this.status = 'success';
    } else {
      this.status = 'error';
    }
    this._emailService.sendMail(form.value).subscribe();
  }

}
