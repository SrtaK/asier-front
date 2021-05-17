import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';

import { PicturesRoutingModule } from './pictures-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';
import { PictureTarjetaComponent } from './components/picture-tarjeta/picture-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';



@NgModule({
  declarations: [
    AgregarComponent,
    ImagenPipe,
    ListadoComponent,
    MainPicturesComponent,
    PictureDetailComponent,
    PictureTarjetaComponent,
    PictureComponent

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
