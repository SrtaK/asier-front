import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common'


import { Picture } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';



@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit {

  picture!: Picture;

  constructor(  private activatedRoute: ActivatedRoute,
                private picturesService: PicturesService,
                private router: Router,
                private location: Location) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.picturesService.getPicturePorId(id))
    )
    .subscribe(resp => this.picture = resp.picture)
  }

  back(): void {
    this.location.back()
  }


}
