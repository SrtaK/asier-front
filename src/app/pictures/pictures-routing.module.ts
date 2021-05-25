import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { HomeComponent } from '../home/home.component';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';
import { LandingComponent } from '../landing/landing.component';

import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { ValidarAdminnGuard } from '../guards/validar-admin.guard';
import { EditarComponent } from './pages/editar/editar.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'listado/:serie',
    component: ListadoComponent,
  },
  {
    path: 'detail/:id',
    component: PictureDetailComponent
  },
  {
    path: ':id',
    component: PictureComponent
  },
  {
    path: 'configurar',
    component: MainPicturesComponent,
    canActivate: [ValidarTokenGuard, ValidarAdminnGuard],
    canLoad: [ValidarTokenGuard, ValidarAdminnGuard],
    children: [
      {
        path:'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: EditarComponent
      }
    ]
  },

  {
    path: '**',
    component:HomeComponent
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
export class PicturesRoutingModule { }
