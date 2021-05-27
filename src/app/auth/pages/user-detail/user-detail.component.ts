import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/users.interfaces';
import { AuthService } from '../../services/auth.service';
import { ConfirmarComponent } from 'src/app/pictures/components/confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import { ContactoService } from '../../../contacto/contacto.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;

  datosEmail = {
    "email" : 'usuario@usuario.com',
    "subject": "Usuario borrado",
    "texto" : "Un usuario se ha dado de baja"
  }

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog,
              private router: Router,
              private contactoService:ContactoService,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    if(this.router.url.includes('usuario')){
      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.authService.getUserPorId(id))
      )
      .subscribe(
        ok => {
          this.user = ok.user
        })
    }
  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data: {...this.user}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.authService.borrarUser(this.user._id!)
            .subscribe( resp => {
              this.mostrarSnackBAr('Usuario eliminado');
              this.router.navigateByUrl(`/users/registro`);
              this.contactoService.sendEmail(this.datosEmail)
              .subscribe( resp => {
                this.mostrarSnackBAr('Mensaje enviado');})
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
