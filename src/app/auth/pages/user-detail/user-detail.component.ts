import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { User } from '../../interfaces/users.interfaces';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              // private router: Router,
              // private location: Location
               ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.authService.getUserPorId(id))
    )
    .subscribe(resp => this.user = resp.user)
    console.log('funciona')
  }

}
