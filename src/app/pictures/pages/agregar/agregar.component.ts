import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Picture, Serie } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


  series = [
    {
      id: 'El cuerpo orográfico',
      desc: 'El cuerpo orográfico'
    },
    {
      id: 'WW1',
      desc: 'WW1'
    },
    {
      id: 'Nosotros los pueblos',
      desc: 'Nosotros los pueblos'
    },
    {
      id: 'Las formas del desnudo',
      desc: 'Las formas del desnudo'
    }
  ]

  picture: Picture = {
    nombre: '',
    annio:'',
    imagen:'',
    serie: Serie.ElCuerpoOrografico,
    medidas:'',
    tecnica:'',
    soporte:'',
    disponible:false,
    precio: 0

  }


  constructor(  private pictureService: PicturesService,
                private activatedRoute: ActivatedRoute,
                private router:Router,
                private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private location: Location) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.pictureService.getPicturePorId(id))
      )
      .subscribe( res => this.picture = res.picture )
  }


  guardar(){
    //pequeña validación a ver si llega un picture
    if( this.picture.nombre.trim().length == 0){
      return
    }


    if( this.picture._id ){ //si la obra tiene id es que estoy editando
      //Actualizar
      this.pictureService.actualizarPicture(this.picture)
      .subscribe( resp => {
        this.mostrarSnackBAr('Picture actualizado');
      })
    }else{
    //Crear nuevo
      this.pictureService.agregarPicture(this.picture)
        .subscribe( picture => {
          this.router.navigate(['/pictures/editar', picture._id]);
          this.mostrarSnackBAr('Heroe guardado');
        })


  }



}

mostrarSnackBAr(mensaje: string){
  this.snackBar.open(mensaje, 'ok!', {
    duration: 2500
  })
}

}
