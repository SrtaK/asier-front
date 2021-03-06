import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module'
import { ReactiveFormsModule } from '@angular/forms';

import { PicturesRoutingModule } from './pictures-routing.module';

import { TituloPipe } from '../pipes/titulo.pipe';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';
import { PictureTarjetaComponent } from './components/picture-tarjeta/picture-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { EditarComponent } from './pages/editar/editar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    ConfirmarComponent,
    ListadoComponent,
    MainPicturesComponent,
    PictureTarjetaComponent,
    PictureComponent,
    TituloPipe,
    EditarComponent


  ],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PicturesModule { }
