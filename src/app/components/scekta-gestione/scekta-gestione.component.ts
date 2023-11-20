import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scekta-gestione',
  templateUrl: './scekta-gestione.component.html',
  styleUrls: ['./scekta-gestione.component.css']
})
export class ScektaGestioneComponent implements OnInit {
  idBanca!: number;
  

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
     const idBanca = +this.route.snapshot.params['idBanca'];
    if (!isNaN(idBanca)) {
      this.idBanca = idBanca;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login', this.idBanca]);
  }

  goToLoginUser(): void {
    this.router.navigate(['/loginUser/', this.idBanca]);
  }
}