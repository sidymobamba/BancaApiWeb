import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operazione } from '../models/operazione.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimentiService {

  constructor(private http: HttpClient) {}

  effettuaPrelievo(idUtente: number, operazione: Operazione): Observable<any> {
    const url = `https://localhost:7020/api/movimenti/prelievo/${idUtente}`;

    return this.http.post(url, operazione);
  }

  effettuaVersamento(idUtente: number, operazione: Operazione): Observable<any> {
    const url = `https://localhost:7020/api/movimenti/versamento/${idUtente}`;

    return this.http.post(url, operazione);
  }

  getSaldo(idUtente: number): Observable<any> {
    const url = `https://localhost:7020/api/movimenti/saldo/${idUtente}`;

    return this.http.get<any>(url);
  }

  getRegistroOperazioni(idUtente: number): Observable<Operazione[]> {
    const url = `https://localhost:7020/api/movimenti/registro-operazioni/${idUtente}`;
    return this.http.get<Operazione[]>(url);
  }
}
