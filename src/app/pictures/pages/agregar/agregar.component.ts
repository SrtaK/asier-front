import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Picture, SerieForm } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})

export class AgregarComponent implements OnInit {

  series : SerieForm[] = [
    {
      id: 'el-cuerpo-orografico',
      desc: 'El cuerpo orográfico'
    },
    {
      id: 'WW1',
      desc: 'WW1'
    },
    {
      id: 'nosotros-los-pueblos',
      desc: 'Nosotros los pueblos'
    },
    {
      id: 'las-formas-del-desnudo',
      desc: 'Las formas del desnudo'
    }
  ]

  serie!: string;
  preview!: string;
  percentDone: any = 0;
  
  color = 'primary';
  checked = false;
  disabled = false

  miFormulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    annio:['', [Validators.required, Validators.minLength(2)]],
    imagen:[ null],
    serie:[ '', Validators.required],
    medidas: ['', [Validators.required, Validators.minLength(2)]],
    tecnica: ['', [Validators.required, Validators.minLength(2)]],
    soporte: ['', [Validators.required, Validators.minLength(2)]],
    disponible: [false, [Validators.required]],
    precio: ['']

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

  }

  esValido(campo:string){
    return this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched

  }

  // Image Preview
  uploadFile(event:any) {
  console.log("eventoe" + event.target!.files[0])
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
      this.miFormulario.value.medidas,
      this.miFormulario.value.tecnica,
      this.miFormulario.value.soporte,
      this.miFormulario.value.disponible,
      this.miFormulario.value.precio,
    )

    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!' + this.miFormulario.value.imagen);
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
          this.serie = event.body.picture.serie;
          this.mostrarSnackBAr('Obra guardada');
          this.router.navigateByUrl(`/pictures/listado/${this.serie}`)
      }
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
