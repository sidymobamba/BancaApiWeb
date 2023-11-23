import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment';
import { Funzionalita } from '../models/funzionalita.model';

@Injectable({
  providedIn: 'root'
})
export class FunzionalitaService {
  baseApiUrl:string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getFunzionalita(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl + 'api/Func');
  }

  getFunzionalitaByBancaId(idBanca: number): Observable<Funzionalita[]> {
    return this.http.get<Funzionalita[]>(`${this.baseApiUrl}api/banchefunc/funzionalita/${idBanca}`);
  }

  aggiungiFunzionalita(idBanca: number, funzionalitaDaAggiungere: any[]): Observable<void> {
    return this.http.put<void>(`${this.baseApiUrl}api/banchefunc/update-funz/${idBanca}`, funzionalitaDaAggiungere)
      .pipe(
        catchError((error) => {
          console.error('Errore durante la richiesta HTTP:', error);
          throw error;
        })
      );
  }
  
}

  
  


