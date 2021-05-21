import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { EditarComponent } from './pages/editar/editar.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ListadoComponent,
    MainAuthComponent,
    UserDetailComponent,
    EditarComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class AuthModule { }
