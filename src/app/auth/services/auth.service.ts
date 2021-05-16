import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers(){
    //como desde el back pido un token para obtenerlo aun no puedo
    return this.http.get('http://localhost:4000/api/users')
  }





}
