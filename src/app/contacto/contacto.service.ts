import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactoService {

  private baseUrl: string = environment.baseUrl; //variable global


  constructor( private http: HttpClient) { }

  sendEmail(form:any){
    //const form = { email, subject, text };
    const url = `${this.baseUrl}/email`;

    return this.http.post<any>(url, form);
  }
}
