import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs'


import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/users.interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.basUrl; //variable global
  private _usuario!:User;

  constructor(private http: HttpClient) { }

  get usuario(){
    return {...this._usuario};
  }

  getUsers(){
    //como desde el back pido un token para obtenerlo aun no puedo
    return this.http.get('http://localhost:4000/api/users')
  }

  registro(name:string, email:string, password:string){
    const url = `${this.baseUrl}/register`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ({ok, token}) => {
          if ( ok ) {
            localStorage.setItem('token', token! );

          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  //devuelve un observable
  login(email: string, password: string){

    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token! );

          }
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  //leo la función renew y con ella se los datos del user
  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');//los heqders que quiero mandar

      return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          //establezco el nuevo token de la respuesta
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name!,
            //uid: resp.uid!,
            email: resp.email!

          }

          return resp.ok;
        }),
        catchError( err => of(false) )
      );

  }

  //destruye la sesion borrando el token
  logout(){
    localStorage.removeItem('token');
  }




}
