import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './modulos/user/login/login.component';
import { AdminComponent } from '../app/modulos/admin/admin.component';
import { StarterComponent } from './starter/starter.component';
import { RecuperarComponent } from './modulos/user/recuperar/recuperar.component';
import { DataFormComponent } from './modulos/user/data-form/data-form.component';
import { PerfilComponent } from './modulos/user/perfil/perfil.component';



const routes: Routes = [

{path: 'login', component: LoginComponent},
{path: 'criar-senha', component: RecuperarComponent},
{path: 'admin', component: AdminComponent},  // TODO: only user auth.
{path: 'home', component: StarterComponent}, // TODO: only user auth.
{path: 'registro', component: DataFormComponent}, // TODO: only user auth.
{path: 'perfil', component: PerfilComponent}, // TODO: only user auth.
{path: '', pathMatch: 'full', redirectTo: '/login'}
];




@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [ RouterModule]
})
export class AppRoutingModule {}
