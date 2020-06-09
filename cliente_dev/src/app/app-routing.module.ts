import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent} from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { EditarOfertaComponent } from './editar-oferta/editar-oferta.component';
import { NuevaOfertaComponent } from './nueva-oferta/nueva-oferta.component';
import { OfertaComponent } from './oferta/oferta.component';
import { InscritosComponent } from './inscritos/inscritos.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [ 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'editar-perfil/:id', component: EditarPerfilComponent},
  {path: 'editar-oferta/:id', component: EditarOfertaComponent},
  {path: 'nueva-oferta', component: NuevaOfertaComponent},
  {path: 'oferta/:id', component: OfertaComponent},
  {path: 'ofertas', component: OfertasComponent},
  {path: 'inscritos/:id', component: InscritosComponent},
  {path: 'about', component: AboutComponent},
  {path: 'error', component: ErrorComponent}
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
