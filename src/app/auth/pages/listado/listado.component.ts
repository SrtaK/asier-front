import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from 'src/app/pictures/components/confirmar/confirmar.component';

import { TituloPipe } from '../../../pipes/titulo.pipe';

import { User } from '../../interfaces/users.interfaces';
import { AuthService } from '../../services/auth.service';
import { ContactoService } from '../../../contacto/contacto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  users: User[]= []

  datosEmail = {
    "email" : 'usuario@usuario.com',
    "subject": "Usuario borrado",
    "texto" : "Un usuario se ha dado de baja"
  }

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private router: Router,
              private contactoService:ContactoService,
              private snackBar: MatSnackBar,
              private tituloPipe: TituloPipe

              ) { }

  ngOnInit(): void {

  this.authService.getUsers()
  //se romple porque me falta gestionar el auth
      .subscribe( resp => this.users = resp.users);
  }

  borrar(id: string){
    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',

    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.authService.borrarUser(id)
            .subscribe( resp => {
              this.mostrarSnackBAr('Usuario eliminado');
              this.router.navigateByUrl(`/users/registro`)
              
            })
          }
      }
    )

    this.contactoService.sendEmail(this.datosEmail)
          .subscribe( resp => {
            this.mostrarSnackBAr('Mensaje enviado');})



  }


  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
