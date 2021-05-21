import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  get usuario(){
    return this.authService.usuario
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) { }

    login(){
      //console.log(this.miFormulario.value)
      const { email, password } = this.miFormulario.value;

      this.authService.login(email, password)
        .subscribe(ok =>{
          //si es correcto navega
          if(ok === true){
            this.mostrarSnackBAr('Te has logueado con éxito');
            this.router.navigateByUrl(`/users/usuario/${this.authService.usuario.uid}`);

          }else{
            //sino es correcto manejo el error
            Swal.fire('Error', ok, 'error');
          }
        })



    }

    mostrarSnackBAr(mensaje: string){
      this.snackBar.open(mensaje, 'ok', {
        duration: 2500
      })
    }

}
