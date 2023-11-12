import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  baseApiUrl:string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllUtentti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.baseApiUrl + 'api/utenti');
  }
}
