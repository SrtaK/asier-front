import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';



@NgModule({
  declarations: [
    AgregarComponent,
    PictureComponent,
    ListadoComponent,
    PictureDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PicturesModule { }
