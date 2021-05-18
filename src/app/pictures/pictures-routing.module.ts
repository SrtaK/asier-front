import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { HomeComponent } from '../home/home.component';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';

import { LandingComponent } from '../landing/landing.component';

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
    path:'agregar',
    component: AgregarComponent
  },
  {
    path: 'editar/:id',
    component: AgregarComponent
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
