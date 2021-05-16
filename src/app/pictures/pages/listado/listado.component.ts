import { Component, OnInit } from '@angular/core';

import { PicturesService } from '../../services/pictures.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  //Inyecto el PictureService para poder utilizar sus métodos
  constructor( private picturesService: PicturesService) { }

  ngOnInit(): void {

    //Llamo al método, para que funcione tengo que suscribirme porque devuelve un observable
    this.picturesService.getPictures()
      .subscribe( resp => console.log(resp));
  }
}
