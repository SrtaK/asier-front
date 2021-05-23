import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactoService } from '../../contacto.service';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent implements OnInit {

  formularioContacto: FormGroup = this.fb.group({
    email: ['', [Validators.required,  Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(2)]],
    texto:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private contactoService:ContactoService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  enviarEmail(){
    const form = this.formularioContacto.value;
    console.log(form)
    this.contactoService.sendEmail(form)
    .subscribe( resp => {
      this.mostrarSnackBAr('Mensaje enviado');
    })

  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
