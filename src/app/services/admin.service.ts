import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllAdmin(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseApiUrl + 'api/Admin');
  }

  signUp(newAdmin: any): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseApiUrl}api/Admin/register`, newAdmin);
  }

  login(adminCredentials: any, selectedBancaId: number): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseApiUrl}api/Admin/authenticate`, adminCredentials)
      .pipe(
        map(adminData => {
          if (adminData && adminData.idBanca === selectedBancaId) {
            return adminData;
          } else {
            throw new Error('Accesso non autorizzato');
          }
        }),
        catchError(error => {
          console.error('Errore durante il login:', error);
          return throwError(error);
        })
      );
  }
}
