import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { banca } from '../models/banca.model';

@Injectable({
  providedIn: 'root'
})
export class BancaService {

  baseApiUrl:string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllBanks(): Observable<banca[]> {
    return this.http.get<banca[]>(this.baseApiUrl + 'api/Banca');
  }
  getBancaById(idBanca: number): Observable<banca> {
    return this.http.get<banca>(`${this.baseApiUrl}api/Banca/${idBanca}`);
  }
}
