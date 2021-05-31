import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { Picture, Serie } from '../../interfaces/pictures.interface';
import { PicturesService } from '../../services/pictures.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  color = 'primary';
  checked = false;
  disabled = false

  series = [
    {
      id: 'el-cuerpo-orografico',
      desc: 'El cuerpo orográfico'
    },
    {
      id: 'WWI',
      desc: 'WWI'
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

  picture: Picture = {
    nombre: '',
    annio:'',
    imagen: '',
    serie: Serie.ElCuerpoOrografico,
    medidas:'',
    tecnica:'',
    soporte:'',
    disponible:false,
    precio: ''

  }

  serie!: string;
  preview!: string;
  percentDone: any = 0;

  miFormulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    annio:['', [Validators.required, Validators.minLength(2)]],
    imagen:[ null],
    serie:[ null],
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

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.pictureService.getPicturePorId(id))
    )
    .subscribe(
      resp => {
        this.picture = resp.picture
      })

  }

  esValido(campo:string){
    return this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched

  }

  // Image Preview
  uploadFile(event:any) {

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }
    
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


  actualizar(){

   //Crear nuevo
    this.pictureService.actualizarPicture(
      this.miFormulario.value.nombre,
      this.miFormulario.value.imagen,
      this.miFormulario.value.annio,
      this.miFormulario.value.serie,
      this.miFormulario.value.medidas,
      this.miFormulario.value.tecnica,
      this.miFormulario.value.soporte,
      this.miFormulario.value.disponible,
      this.miFormulario.value.precio, 
      this.picture._id!
    )

    .subscribe(
      
      resp => {
      this.picture.nombre = resp.nombre,
      this.picture.imagen = resp.imagen,
      this.picture.annio = resp.annio,
      this.picture.serie = resp.serie,
      this.picture.medidas = resp.medidas,
      this.picture.tecnica = resp.tecnica,
      this.picture.soporte = resp.soporte,
      this.picture.disponible = resp.disponible,
      this.picture.precio = resp.precio
      console.log('Actualizando', resp);
      this.mostrarSnackBAr('Obra guardada');
      this.router.navigateByUrl(`/pictures/listado/${this.serie}`)
      }
      
    )
}


  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok', {
      duration: 2500
    })
  }


}




