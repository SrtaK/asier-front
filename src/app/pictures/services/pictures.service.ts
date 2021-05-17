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

  pictures: Picture[] = []
  private baseUrl: string = environment.basUrl; //variable global

  //desde aquí hago las peticiones http
  constructor( private http: HttpClient) { }

  getPictures(){
    return this.http.get<PictureResp>(`${this.baseUrl}/pictures`)
  }

  getPicturePorId(id: string){
    return this.http.get<OnePictureResp>(`${this.baseUrl}/picture/${id}`)
  }

  agregarPicture(picture:Picture){
    return this.http.post<Picture>(`${this.baseUrl}/picture/save`, picture)
  }

  actualizarPicture(picture:Picture){
    return this.http.put<Picture>(`${this.baseUrl}/picture/update/${picture._id}`, picture)
  }

  borrarPicture(id:string){
    return this.http.delete<any>(`${ this.baseUrl }/picture/delete/${ id }`)

  }


}
