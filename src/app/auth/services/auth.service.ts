import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs'


import { environment } from '../../../environments/environment';
import { AuthResponse, User, GetUserResponse, GetUsersResponse } from '../interfaces/users.interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.basUrl; //variable global
  private _usuario!:User;

  constructor(private http: HttpClient) { }

  //para no tener eque modificar directamente el usuario
  get usuario(){
    return {...this._usuario};
  }

  getUsers(){
    //como desde el back pido un token para obtenerlo aun no puedo
    return this.http.get<GetUsersResponse>(`${this.baseUrl}/users`)
  }

  getUserPorId(id:string){
    return this.http.get<GetUserResponse>(`${this.baseUrl}/user/${id}`)
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
        //muto la respuesta, quien se suscriba a este metodo solo va a obtener true o false
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  actualizarUser(user:User){
    return this.http.put<GetUserResponse>(`${this.baseUrl}/update-user/${user._id}`, user)
    .pipe(
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
        //tap hace que podamos ejecutar cosas ente operadores,
        //ejecuta ek codigo que hay dentro antes de que pase al siguiente operador
        tap( resp => {
          if ( resp.ok ) {
            localStorage.setItem('token', resp.token! );
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!

            }

          }
        }),
        //el map muta la respuesta, con esta línea podremos suscribirnos a un booleano
        //el resultado de map se pasa al siguiente operador
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
            uid: resp.uid!,
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


  borrarUser(id:string){
    return this.http.delete<any>(`${ this.baseUrl }/delete-user/${ id }`)

  }

}
