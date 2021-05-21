import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { User } from '../../interfaces/users.interfaces';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  user!: User;

  formularioRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.authService.getUserPorId(id))
      )
      .subscribe(
        ok => {
          this.user = ok.user
        })

  }

  actualizar(){
    if( this.user.name.trim().length == 0){
      return
    }

    this.authService.actualizarUser(this.user)
    .subscribe( resp => {
      console.log('Actualizando', resp);
      this.mostrarSnackBAr('Usuario actualizado');
      this.router.navigateByUrl(`/usuario/${this.user._id}`)

    })
  }


  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
