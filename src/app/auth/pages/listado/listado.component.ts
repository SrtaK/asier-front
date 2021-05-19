import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/users.interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  users: User[]= []

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  this.authService.getUsers()
  //se romple porque me falta gestionar el auth
      .subscribe( resp => this.users = resp.users);
  }

}
