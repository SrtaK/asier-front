import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { EditarComponent } from './pages/editar/editar.component';

import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { ValidarAdminnGuard } from '../guards/validar-admin.guard';


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
      {
        path: 'usuario/:id',
        component: UserDetailComponent,
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard],
      },
      {
        path: 'editar/:id',
        component: EditarComponent,
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard],
      },
      {
        path: 'listado',
        component: ListadoComponent,
        canActivate: [ValidarTokenGuard, ValidarAdminnGuard],
        canLoad: [ValidarTokenGuard, ValidarAdminnGuard],
      },
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
