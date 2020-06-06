import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MomentModule} from 'angular2-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MisInscripcionesComponent } from './mis-inscripciones/mis-inscripciones.component';
import { MisOfertasComponent } from './mis-ofertas/mis-ofertas.component';
import { EditarOfertaComponent } from './editar-oferta/editar-oferta.component';
import { NuevaOfertaComponent } from './nueva-oferta/nueva-oferta.component';
import { OfertaComponent } from './oferta/oferta.component';
import { InscritosComponent } from './inscritos/inscritos.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ProfileComponent,
    ErrorComponent,
    EditarPerfilComponent,
    MisInscripcionesComponent,
    MisOfertasComponent,
    EditarOfertaComponent,
    NuevaOfertaComponent,
    OfertaComponent,
    InscritosComponent,
    OfertasComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
