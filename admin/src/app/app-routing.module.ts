import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { JornadasComponent } from './jornadas/jornadas.component';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { LoginComponent } from './login/login.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { NuevaOfertaComponent } from './nueva-oferta/nueva-oferta.component';
import { EditarOfertaComponent } from './editar-oferta/editar-oferta.component';
import {EditarUbicacionComponent} from './editar-ubicacion/editar-ubicacion.component';
import { NuevaUbicacionComponent } from './nueva-ubicacion/nueva-ubicacion.component';
import { NuevaJornadaComponent } from './nueva-jornada/nueva-jornada.component';
import { EditarJornadaComponent } from './editar-jornada/editar-jornada.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'ofertas', component: OfertasComponent},
  {path: 'jornadas', component: JornadasComponent},
  {path: 'ubicaciones', component: UbicacionesComponent},
  {path: 'editar-usuario/:id', component: EditarUsuarioComponent},
  {path: 'nuevo-usuario', component: NuevoUsuarioComponent},
  {path: 'nueva-oferta', component: NuevaOfertaComponent},
  {path: 'editar-oferta/:id', component: EditarOfertaComponent},
  {path: 'editar-ubicacion/:id', component: EditarUbicacionComponent},
  {path: 'nueva-ubicacion', component: NuevaUbicacionComponent},
  {path: 'nueva-jornada', component: NuevaJornadaComponent},
  {path: 'editar-jornada/:id', component: EditarJornadaComponent}





  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
