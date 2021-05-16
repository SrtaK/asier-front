import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  this.authService.getUsers()
  //se romple porque me falta gestionar el auth
      .subscribe( resp => console.log(resp));
  }

}
