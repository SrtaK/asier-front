import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mapTo, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs'


import { environment } from '../../../environments/environment';
import { AuthResponse, User, GetUserResponse, GetUsersResponse } from '../interfaces/users.interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl; //variable global

  private _usuario!:User;
  private id:string = '';

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
    //devuelve ok(boolean) y user
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

  actualizarUser(user:User, id:string){
    return this.http.put<GetUserResponse>(`${this.baseUrl}/update-user/${id}`, user)
    // .pipe(
    //   map( resp => console.log(resp) ),
    //   catchError( err => of(err.error.msg) )
    // );
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
            //la guardo para acceder con facilidad
            localStorage.setItem('uid', resp.uid!);
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

  //destruye la sesion borrando el token
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  }


  borrarUser(id:string){
    return this.http.delete<any>(`${ this.baseUrl }/delete-user/${ id }`)

  }

    //leo la función renew y con ella se los datos del user
    validarToken(): Observable<boolean>{
      const url = `${this.baseUrl}/renew`;
      const headers = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '');//los heqders que quiero mandar, si es nulo string vacio

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

    // validarAdmin(): Observable<boolean>{
    //   const url = `${this.baseUrl}/renew`;
    //   const headers = new HttpHeaders()
    //     .set('x-token', localStorage.getItem('token') || '');//los heqders que quiero mandar, si es nulo string vacio

    //     return this.http.get<AuthResponse>( url, { headers } )
    //     //aqui recibe el uid, tengo que comprobar si es igual al del admin
    //     .pipe(
    //       map( resp => {
    //         this.isAdmin(resp.uid!);
    //       })
    //       mapTo(true),
    //       catchError(error => {
    //         console.log(error.error);
    //         return of(false)
    //       })
    //     )
    //   }

      //obtener del localstorage uid
      //comprobar si esa uid es la del admin
      //si es admin respondo true sino false
      //if uid != tal return false





    // isAdmin(id:string): Observable<boolean>{
    //   if(id != '60a7db39122a552704498795'){
    //     return of(false);
    //   }
    //   return of(true);
    // }

  }


