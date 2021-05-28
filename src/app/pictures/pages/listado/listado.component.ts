import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PicturesService, } from '../../services/pictures.service';
import { Picture, PictureResp } from '../../interfaces/pictures.interface';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  pictures: Picture[]= []

  //Inyecto el PictureService para poder utilizar sus métodos
  constructor(  private picturesService: PicturesService,
                private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({serie}) => this.picturesService.getPicturesPorSerie(serie))
    )
    .subscribe(resp => this.pictures = resp.pictures);
  }

}


