import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  signUp(newAdmin: any): Observable<admin> {
    return this.http.post<admin>(`${this.baseApiUrl}api/Admin/register`, newAdmin);
  }

  login(adminCredentials: any): Observable<admin> {
    return this.http.post<admin>(`${this.baseApiUrl}api/Admin/authenticate`, adminCredentials);
  }
}
