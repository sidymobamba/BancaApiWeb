import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) { }

  onLogout(): void {
    // Aggiungi la logica di logout qui, se necessario

    // Reindirizza alla pagina selectBanca
    this.router.navigate(['/selectBanca']);
  }

}
