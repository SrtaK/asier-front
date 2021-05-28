import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Picture } from '../../interfaces/pictures.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { PicturesService } from '../../services/pictures.service';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-picture-tarjeta',
  templateUrl: './picture-tarjeta.component.html',
  styleUrls: ['./picture-tarjeta.component.css']
})

export class PictureTarjetaComponent implements OnInit{

  admin: boolean =false;
  logueado: boolean =false;

  constructor(  public dialog: MatDialog,
                private pictureService: PicturesService,
                private router:Router,
                private snackBar: MatSnackBar,
                ){}

  ngOnInit(): void {

    if (localStorage.getItem('uid') !== null) {
      var uid = localStorage.getItem('uid');
      if(uid == '60a7db39122a552704498795'){
        this.admin = true;
      }
      this.logueado = true;
    } else {
      console.log(`No está registrado`);
    }

  }
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

  openModal(){
    Swal.fire(
      'La tienda aún no está disponible',
      'El precio de la obra' + this.picture.nombre + ' es de ' + this.picture.precio + ' €',      
      'info'
    )
  }
}
