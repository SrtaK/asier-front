import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent{

  formularioRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }


  register(){
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

  }


  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
