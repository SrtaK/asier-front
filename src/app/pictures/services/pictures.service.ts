import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PictureResp, Picture, OnePictureResp } from '../interfaces/pictures.interface';
import { Observable } from 'rxjs';
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
    return this.http.get<OnePictureResp>(`${this.baseUrl}/pictures${ id }`)
  }



}
