import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs'

import { PictureResp, Picture, OnePictureResp } from '../interfaces/pictures.interface';
import { environment } from '../../../environments/environment';

//Visible en toda la app:
@Injectable({
  providedIn: 'root'
})

export class PicturesService {

  private _picture!: Picture;
  private baseUrl: string = environment.basUrl; //variable global



  get picture(){
    return {...this._picture};
  }

  //desde aquí hago las peticiones http
  constructor( private http: HttpClient) { }

  getPictures(){
    return this.http.get<PictureResp>(`${this.baseUrl}/pictures`)
  }

  getPicturePorId(id: string){
    return this.http.get<OnePictureResp>(`${this.baseUrl}/picture/${id}`)
  }

  agregarPicture(picture:Picture){
    return this.http.post<PictureResp>(`${this.baseUrl}/picture/save`, picture)
    .pipe(
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  actualizarPicture(picture:Picture){
    return this.http.put<PictureResp>(`${this.baseUrl}/picture/update/${picture._id}`, picture)
    .pipe(
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    );
  }

  borrarPicture(id:string){
    return this.http.delete<any>(`${ this.baseUrl }/picture/delete/${ id }`)

  }


}
