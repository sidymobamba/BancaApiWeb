import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllUtentti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.baseApiUrl + 'api/utenti');
  }

  getUtentiByBancaId(idBanca: number): Observable<Utente[]> {
    return this.http.get<Utente[]>(`${this.baseApiUrl}api/utenti/byBanca/${idBanca}`);
  }

  addUtente(utenteDto: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}api/utenti`, utenteDto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Errore durante l\'aggiunta dell\'utente:', error);
          return throwError(error);
        })
      );
  }

  getUtente(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.baseApiUrl}api/utenti/${id}`);
  }

  updateUtente(id: number | undefined, utenteDto: Utente): Observable<Utente> {
    if (id === undefined) {
      console.error('Id is undefined');
      return throwError('Id is undefined'); 
    }
    
    return this.http.put<Utente>(`${this.baseApiUrl}api/utenti/${id}`, utenteDto);
  }

  deleteUtente(id: number | undefined): Observable<Utente>{
    if (id === undefined) {
      console.error('Id is undefined');
      return throwError('Id is undefined'); 
    }
    return this.http.delete<Utente>(`${this.baseApiUrl}api/utenti/${id}`);
  }
  
  login(userCredentials: any, selectedBancaId: number): Observable<Utente> {
    console.log(userCredentials);
    return this.http.post<Utente>(`${this.baseApiUrl}api/utenti/authenticate`, userCredentials)
      .pipe(
        map(userData => {
          if (userData &&  userData.idBanca === selectedBancaId) {
            return userData;
          } else {
            throw new Error('Accesso non autorizzato: Credenziali o banca non valide.');
          }
        }),        
        catchError(error => {
          console.error('Errore durante il login:', error);
          return throwError(error);
        })
      );
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return null;
    }
  
    return token;
  }
  
  
  
}
