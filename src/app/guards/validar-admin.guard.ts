import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ValidarAdminnGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ){}

  canActivate(): Observable<boolean> | boolean {
    if (localStorage.getItem('uid') == '60a7db39122a552704498795'){
      return true;
    }
    else{
      console.log('no pasas de aqui')
      return false;
    }
  }

    canLoad(): Observable<boolean> | boolean {
      if (localStorage.getItem('uid') == '60a7db39122a552704498795'){
        return true;
      }
      else{
        return false;
      }
  }

}
