import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtentiService } from '../services/utenti.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private utenteService: UtentiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.utenteService.getToken();

    if (authToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` }
      });
    }

    return next.handle(request);
  }
}
