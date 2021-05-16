import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PictureResp, Picture, OnePictureResp } from '../interfaces/pictures.interface';
import { Observable } from 'rxjs';

//Visible en toda la app:
@Injectable({
  providedIn: 'root'
})

export class PicturesService {

pictures: Picture[] = []

  //desde aquí hago las peticiones http
  constructor( private http: HttpClient) { }

  getPictures(){
    return this.http.get<PictureResp>('http://localhost:4000/api/pictures')
  }

  getPicturePorId(id: string){
    return this.http.get<OnePictureResp>(`http://localhost:4000/api/picture/${ id }`)
  }



}
