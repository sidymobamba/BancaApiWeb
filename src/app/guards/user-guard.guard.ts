import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UtentiService } from '../services/utenti.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : UtentiService, private router: Router, private toast: NgToastService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }else{
      this.toast.error({detail:"ERROR", summary:"Please Login First!"});
      this.router.navigate(['loginUser/:idBanca'])
      return false;
    }
  }

}