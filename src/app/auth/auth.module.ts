import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoComponent } from './pages/listado/listado.component';



@NgModule({
  declarations: [LoginComponent, RegistroComponent, ListadoComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
