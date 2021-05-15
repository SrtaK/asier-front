import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from '../home/home.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';


const routes: Routes = [
  {
    path:'',
    component:MainAuthComponent,
    //coloco el children para establecer las rutas hijas
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      //Faltan rutas
      {
        path: '**',
        component:HomeComponent
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
