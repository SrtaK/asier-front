import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { PictureComponent } from './pages/picture/picture.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { PictureDetailComponent } from './pages/picture-detail/picture-detail.component';
import { PicturesRoutingModule } from './pictures-routing.module';
import { MainPicturesComponent } from './pages/main-pictures/main-pictures.component';



@NgModule({
  declarations: [
    AgregarComponent,
    PictureComponent,
    ListadoComponent,
    PictureDetailComponent,
    MainPicturesComponent
  ],
  imports: [
    CommonModule,
    PicturesRoutingModule
  ]
})
export class PicturesModule { }
