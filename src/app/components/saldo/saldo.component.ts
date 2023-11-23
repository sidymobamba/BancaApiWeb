import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Operazione } from 'src/app/models/operazione.model';
import { MovimentiService } from 'src/app/services/movimenti.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit, OnDestroy {
  operazione: Operazione = {
    id: 0,
    idBanca: 0,
    idUtente: 0,
    funzionalita: 'Prelievo',
    quantita: 0,
    dataOperazione: new Date()
  };
  saldo: number = 0;
  idUtente: number = 0; 
  private routeSubscription: Subscription | null = null;

  constructor(private movimentiService: MovimentiService, private route: ActivatedRoute) {
    this.routeSubscription = this.route.params.subscribe(params => {
      const idUtente = +params['idUtente'];
      if (!isNaN(idUtente)) {
        this.operazione.idUtente = idUtente;
      }
    });
  }

  ngOnInit(): void {
    this.movimentiService.getSaldo(this.operazione.idUtente).subscribe(
      response => {
        console.log(response);
        this.saldo = response.saldo;
        console.log('Saldo:', this.saldo); 
      },
      error => {
        console.error('Error fetching account balance', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
