import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth/services/auth.service';
import { PicturesService } from '../pictures/services/pictures.service';
import { User } from '../auth/interfaces/users.interfaces';
import { Picture } from '../pictures/interfaces/pictures.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  admin: boolean =false;

  public user!:User;
  pictures: Picture[]= []

  constructor( private router: Router,
                private authService: AuthService,
                private picturesService: PicturesService,
                private snackBar: MatSnackBar,
                ) { }

  ngOnInit(): void {

    if (localStorage.getItem('uid') !== null) {
      var uid = localStorage.getItem('uid');
      if(uid == '60a7db39122a552704498795'){
        this.admin = true;
      }
      this.authService.getUserPorId(uid!)
      .subscribe(
        ok => {
          this.user = ok.user
          console.log(this.user)
        })
    } else {
      console.log(`No está registrado`);
    }

  }

  logout(){
    this.mostrarSnackBAr('¡Hasta pronto!');
    this.router.navigateByUrl('/users/login');
    this.authService.logout();
    //console.log('done!');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;


  }

  mostrarSnackBAr(mensaje: string){
    this.snackBar.open(mensaje, 'ok', {
      duration: 2500
    })
  }

  listadoPictures(serie:string){
    this.picturesService.getPicturesPorSerie(serie)
    .subscribe( resp => this.pictures = resp.pictures) 
  }
}
