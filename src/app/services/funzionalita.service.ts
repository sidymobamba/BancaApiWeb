import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunzionalitaService {
  baseApiUrl:string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getFunzionalita(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl + 'api/Func');
  }

}
