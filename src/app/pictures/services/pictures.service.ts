import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Visible en toda la app:
@Injectable({
  providedIn: 'root'
})

export class PicturesService {

  //desde aquí hago las peticiones http
  constructor( private http: HttpClient) { }

  getPictures(){
    return this.http.get('http://localhost:4000/api/pictures')
  }

  
}
