import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

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
                public dialog: MatDialog

              ) { }

  ngOnInit(): void {



    //cuando accedo a añadir/no editar me da error
    //core.js:6142 ERROR HttpErrorResponse {headers: HttpHeaders, status: 500, statusText: "Internal Server Error", url: "http://localhost:4000/api/picture/undefined", ok: false, …}
    // this.activatedRoute.params
    //   .pipe(
    //     switchMap(({id})=> this.pictureService.getPicturePorId(id))
    //   )
    //   .subscribe( res => this.picture = res.picture )

  }


  save(){
    //pequeña validación a ver si llega un picture
    if( this.picture.nombre.trim().length == 0){
      return
    }
   //Crear nuevo
    this.pictureService.agregarPicture(this.picture)
      .subscribe(ok =>{
        //si es correcto navega
        if(ok === true){
          this.mostrarSnackBAr('Obra guardada');
          this.router.navigateByUrl(`/home`)
        }else{
          //sino es correcto manejo el error
          this.mostrarSnackBAr('No se ha guardado, inténta más tarde');
        }
      })

  }

  actualizar(){
    if( this.picture.nombre.trim().length == 0){
      return
    }

    this.pictureService.actualizarPicture(this.picture)
    .subscribe( resp => {
      console.log('Actualizando', resp);
      this.mostrarSnackBAr('Obra actualizada');
      this.router.navigateByUrl(`/listado/${this.picture.serie}`)

    })
  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok', {
      duration: 2500
    })
  }


}
