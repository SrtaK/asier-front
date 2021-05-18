import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainAuthComponent } from './pages/main-auth/main-auth.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ListadoComponent,
    MainAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
