import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { Picture, Serie } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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
    imagen: '',
    serie: Serie.ElCuerpoOrografico,
    medidas:'',
    tecnica:'',
    soporte:'',
    disponible:false,
    precio: 0

  }


  preview!: string;
  percentDone: any = 0;

  miFormulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    annio:['', [Validators.required, Validators.minLength(4)]],
    imagen:[ null, Validators.required],
    serie:[ null, Validators.required],
    medidas: ['', [Validators.required]],
    tecnica: ['', [Validators.required]],
    soporte: ['', [Validators.required]],
    disponible: ['', [Validators.required]],
    precio: ['', [Validators.required]],
  });


  constructor(  private pictureService: PicturesService,
                private activatedRoute: ActivatedRoute,
                private router:Router,
                private snackBar: MatSnackBar,
                public dialog: MatDialog,
                private fb: FormBuilder,
              ) {

               }

  ngOnInit(): void {

    // cuando accedo a añadir/no editar me da error
    // core.js:6142 ERROR HttpErrorResponse {headers: HttpHeaders, status: 500, statusText: "Internal Server Error", url: "http://localhost:4000/api/picture/undefined", ok: false, …}
    if(this.router.url.includes('editar')){
      this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.pictureService.getPicturePorId(id))
      )
      .subscribe( res => this.picture = res.picture )
    }


  }

  // Image Preview
  uploadFile(event:any) {
    const file = event.target!.files[0];
    this.miFormulario.patchValue({
      imagen: file
    });
    this.miFormulario.get('imagen')!.updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  save(){

   //Crear nuevo
    this.pictureService.agregarPicture(
      this.miFormulario.value.nombre,
      this.miFormulario.value.imagen,
      this.miFormulario.value.annio,
      this.miFormulario.value.serie,
      this.miFormulario.value.tecnica,
      this.miFormulario.value.medidas,
      this.miFormulario.value.soporte,
      this.miFormulario.value.disponible,
      this.miFormulario.value.precio)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round(event.loaded / event.total! * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.percentDone = false;
            this.mostrarSnackBAr('Obra guardada');
            this.router.navigateByUrl(`/pictures/listado/${this.normalizarSerie( this.miFormulario.value.serie)}`)
        }
      })
    }

      // .subscribe(ok =>{
      //   //si es correcto navega
      //   if(ok === true){
      //     this.mostrarSnackBAr('Obra guardada');
      //     this.router.navigateByUrl(`/pictures/listado/${this.normalizarSerie(this.picture)}`)
      //   }else{
      //     //sino es correcto manejo el error
      //     this.mostrarSnackBAr('No se ha guardado, inténta más tarde');
      //   }
      // })



  actualizar(){
    if( this.picture.nombre.trim().length == 0){
      return
    }

    this.pictureService.actualizarPicture(this.picture)
    .subscribe( resp => {
      console.log('Actualizando', resp);
      this.mostrarSnackBAr('Obra actualizada');
      this.router.navigateByUrl(`/pictures/listado/${this.normalizarSerie(this.picture)}`)

    })
  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok', {
      duration: 2500
    })
  }


  normalizarSerie(picture: Picture){

  //elimino espacios en blanco y caracteres
  var rutaSerie = picture.serie.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");
  return rutaSerie;
  }

}
