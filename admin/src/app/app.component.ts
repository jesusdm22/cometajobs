import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from '../app/services/usuario.service';
import { GLOBAL } from '../app/services/global';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent {
  title = 'admin';
  public identity;
  public url: string;

  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._usuarioService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(){
    this.identity = this._usuarioService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['']);
  }

}