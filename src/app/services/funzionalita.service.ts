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
  // updateFunzionalitaByBancaId(idBanca: number, bancheFuncDtos: any[]): Observable<void> {
  //   return this.http.put<void>(`${this.baseApiUrl}api/banchefunc/update-funzionalita/${idBanca}`, bancheFuncDtos);
  // }

  updateFunzionalitaByBancaId(idBanca: number, funzionalitaList: Funzionalita[]): Observable<void> {
    const bancheFuncDtos = funzionalitaList.map(funzionalita => ({ idFunzionalita: funzionalita.id }));
  
    return this.http.put<void>(`${this.baseApiUrl}api/banchefunc/update-funz/${idBanca}`, bancheFuncDtos)
      .pipe(
        catchError((error) => {
          console.error('Errore durante la richiesta HTTP:', error);
          throw error; 
        })
      );
  }
  
}

  
  
  


