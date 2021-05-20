import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Picture } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';



@Component({
  selector: 'app-picture-tarjeta',
  templateUrl: './picture-tarjeta.component.html',
  styleUrls: ['./picture-tarjeta.component.css']
})

export class PictureTarjetaComponent {

constructor(  private pictureService: PicturesService,
              public dialog: MatDialog,
              private router:Router,
              private snackBar: MatSnackBar,
              ){}

  @Input() picture!: Picture;

  borrarPicture(){

    //con data envio la información al componente hijo
    //... para no modificar el objeto heroe
    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: {...this.picture}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.pictureService.borrarPicture(this.picture._id!)
            .subscribe( resp => {
              //si se borra llévame al listado
              this.mostrarSnackBAr('Obra eliminada');
              this.router.navigateByUrl(`/listado/${this.picture.serie}`)

            })
        }
      }
    )
  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
