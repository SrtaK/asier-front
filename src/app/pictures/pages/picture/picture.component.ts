import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common'


import { Picture } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';



@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit {

  picture!: Picture;

  constructor(  private activatedRoute: ActivatedRoute,
                public dialog: MatDialog,
                private snackBar: MatSnackBar,
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
          this.picturesService.borrarPicture(this.picture._id!)
            .subscribe( resp => {
              //si se borra llévame al listado
              console.log(this.picture.serie);
              this.mostrarSnackBAr('Obra eliminada');
              this.router.navigateByUrl(`/pictures/listado/${this.picture.serie}`)

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
