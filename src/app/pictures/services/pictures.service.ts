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

  getPicturesPorSerie(serie:string){
    return this.http.get<PictureResp>(`${this.baseUrl}/pictures/get-by-serie/${serie}`)
  }

  agregarPicture(
    nombre: string,
    imagen: File,
    annio: string,
    serie: string,
    medidas: string,
    tecnica: string,
    soporte: string,
    disponible: boolean,
    precio: string
    ){
      var formData: any = new FormData();
      formData.append("nombre", nombre);
      formData.append("annio", annio);
      formData.append("imagen", imagen);
      formData.append("serie", serie);
      formData.append("medidas", medidas);
      formData.append("tecnica", tecnica);
      formData.append("soporte", soporte);
      formData.append("disponible", disponible);
      formData.append("precio", precio);

      return this.http.post<PictureResp>(`${this.baseUrl}/picture/save`, formData, {
        reportProgress: true,
        observe: 'events'
      })
  }

  actualizarPicture(
    nombre: string,
    imagen: File,
    annio: string,
    serie: string,
    medidas: string,
    tecnica: string,
    soporte: string,
    disponible: boolean,
    precio: string,
    id:string
    ){
      var formData: any = new FormData();
      formData.append("nombre", nombre);
      formData.append("annio", annio);
      formData.append("imagen", imagen);
      formData.append("serie", serie);
      formData.append("medidas", medidas);
      formData.append("tecnica", tecnica);
      formData.append("soporte", soporte);
      formData.append("disponible", disponible);
      formData.append("precio", precio);

    return this.http.put<PictureResp>(`${this.baseUrl}/picture/update/${id}`, formData)
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
