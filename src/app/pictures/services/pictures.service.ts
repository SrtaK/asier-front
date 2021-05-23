import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'
import { Observable, of, throwError } from 'rxjs'

import { PictureResp, Picture, OnePictureResp, Serie } from '../interfaces/pictures.interface';
import { environment } from '../../../environments/environment';

//Visible en toda la app:
@Injectable({
  providedIn: 'root'
})

export class PicturesService {

  private _picture!: Picture;
  private baseUrl: string = environment.baseUrl; //variable global



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

  // agregarPicture(picture:Picture){
  //   return this.http.post<PictureResp>(`${this.baseUrl}/picture/save`, picture)
  //   .pipe(
  //     map( resp => resp.ok ),
  //     catchError( err => of(err.error.msg) )
  //   );
  // }


  agregarPicture(
    nombre: string,
    imagen: File,
    annio: string,
    serie: string,
    soporte: string,
    medidas: string,
    tecnica: string,
    disponible: boolean,
    precio: string
    ){
      var formData: any = new FormData();
      formData.append("nombre", nombre);
      formData.append("imagen", imagen);
      formData.append("annio", annio);
      formData.append("serie", serie);
      formData.append("tecnica", tecnica);
      formData.append("medidas", medidas);
      formData.append("soporte", soporte);
      formData.append("disponible", disponible);
      formData.append("precio", precio);

      return this.http.post<PictureResp>(`${this.baseUrl}/picture/save`, formData, {
        reportProgress: true,
        observe: 'events'
      })
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



  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
