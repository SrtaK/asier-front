import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module'

import { PicturesRoutingModule } from './pictures-routing.module';

import { ImagenPipe } from './pipes/imagen.pipe';
import { UrlPipe } from './pipes/url.pipe';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';
import { PictureTarjetaComponent } from './components/picture-tarjeta/picture-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    ConfirmarComponent,
    ImagenPipe,
    ListadoComponent,
    MainPicturesComponent,
    PictureDetailComponent,
    PictureTarjetaComponent,
    PictureComponent,
    UrlPipe


  ],
  imports: [
    CommonModule,
    PicturesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ]
})
export class PicturesModule { }
