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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'editar-perfil', component: EditarPerfilComponent},
  {path: 'editar-oferta/:id', component: EditarOfertaComponent},
  {path: 'nueva-oferta', component: NuevaOfertaComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
