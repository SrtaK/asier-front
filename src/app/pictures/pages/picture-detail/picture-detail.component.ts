import { Component, OnInit } from '@angular/core';

import { PicturesService, } from '../../services/pictures.service';
import { Picture, PictureResp } from '../../interfaces/pictures.interface';

@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.css']
})
export class PictureDetailComponent implements OnInit {

  pictures: Picture[]= []


  constructor( private picturesService: PicturesService) { }

  ngOnInit(): void {


  }

}
