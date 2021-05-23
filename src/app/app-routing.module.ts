import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/components/contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './shared/error/error.component';


const routes: Routes = [
  //1.Definimos las rutas
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'pictures',
        loadChildren: () => import ('./pictures/pictures.module')
                              .then( modulos => modulos.PicturesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./auth/auth.module')
                              .then( modulos => modulos.AuthModule)
      },{
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: '',
        component: LandingComponent

      }

    ]
    },
    {
      path: '**',
      redirectTo: ''
      //component: ErrorComponent
    }


]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  exports: [RouterModule]

})

export class AppRoutingModule { }
