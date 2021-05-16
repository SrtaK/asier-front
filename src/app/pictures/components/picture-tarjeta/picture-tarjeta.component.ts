import { Component, Input } from '@angular/core';
import { Picture } from '../../interfaces/pictures.interface';


@Component({
  selector: 'app-picture-tarjeta',
  templateUrl: './picture-tarjeta.component.html',
  styleUrls: ['./picture-tarjeta.component.css']
})

export class PictureTarjetaComponent {

  @Input() picture!: Picture;

}
