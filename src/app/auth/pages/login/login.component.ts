import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

    login(){
      console.log(this.miFormulario.value)
      const { email, password } = this.miFormulario.value;

      this.authService.login(email, password)
        .subscribe(ok =>{
          console.log(ok);
          //si es correcto navega
          if(ok === true){
            this.router.navigateByUrl('/landing')
          }else{
            //sino es correcto manejo el error
            Swal.fire('Error', ok, 'error');
          }
        })



    }

}
