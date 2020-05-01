import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { NuevaOfertaComponent } from './nueva-oferta/nueva-oferta.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    OfertasComponent,
    JornadasComponent,
    UbicacionesComponent,
    LoginComponent,
    EditarUsuarioComponent,
    NuevoUsuarioComponent,
    NuevaOfertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
