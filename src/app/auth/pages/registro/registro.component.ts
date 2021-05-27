import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { ContactoService } from '../../../contacto/contacto.service';

import Swal from 'sweetalert2';

import { User } from '../../interfaces/users.interfaces';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit{

  user!: User;

  formularioRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  datosEmail = {
    "email" : 'usuario@usuario.com',
    "subject": "Nuevo registro",
    "texto" : "Un usuario se ha registrado"
  }

  

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private contactoService:ContactoService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

ngOnInit(): void {
  //si la url tiene editar busco al usuario
  // if(this.router.url.includes('editar')){
  //   this.activatedRoute.params
  //   .pipe(
  //     switchMap(({id})=> this.authService.getUserPorId(id))
  //   )
  //   .subscribe( res => this.user = res.user )
  // }
}

  esValido(campo:string){
    return this.formularioRegister.controls[campo].errors 
        && this.formularioRegister.controls[campo].touched

  }

  register(){
    
    if(this.formularioRegister.invalid){
      this.formularioRegister.markAllAsTouched();
      return
    }

    const { name, email, password } = this.formularioRegister.value;
    this.authService.registro(name, email, password)
      .subscribe(ok =>{
        //si es correcto navega
        if(ok === true){
          this.mostrarSnackBAr('Te has registrado con éxito');
          this.router.navigateByUrl('/users/login')
        }else{
          //sino es correcto manejo el error
          Swal.fire('Ups, algo se ha roto, vuelve más tarde', ok, 'error');
        }
      })

      this.contactoService.sendEmail(this.datosEmail)
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
