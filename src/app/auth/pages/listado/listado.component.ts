import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from 'src/app/pictures/components/confirmar/confirmar.component';

import { User } from '../../interfaces/users.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  users: User[]= []

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private router: Router,

              private snackBar: MatSnackBar,

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
              //si se borra llévame al listado
              this.mostrarSnackBAr('Usuario eliminado');
              this.router.navigateByUrl(`/users/registro`)
            })
        }
      }
    )
  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
