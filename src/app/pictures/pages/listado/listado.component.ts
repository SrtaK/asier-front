import { Component, OnInit } from '@angular/core';

import { PicturesService, } from '../../services/pictures.service';
import { Picture, PictureResp } from '../../interfaces/pictures.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  pictures: Picture[]= []

  //Inyecto el PictureService para poder utilizar sus métodos
  constructor( private picturesService: PicturesService) { }

  ngOnInit(): void {

    //Llamo al método, para que funcione tengo que suscribirme porque devuelve un observable
    this.picturesService.getPictures()
      .subscribe( resp => this.pictures = resp.pictures) //los pictures que traigo en la respuesta ahora son mis pictures





  }
}


