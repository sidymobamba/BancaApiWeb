import { Component, OnInit, OnDestroy } from '@angular/core';
import { Operazione } from 'src/app/models/operazione.model';
import { MovimentiService } from 'src/app/services/movimenti.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prelievo',
  templateUrl: './prelievo.component.html',
  styleUrls: ['./prelievo.component.css']
})
export class PrelievoComponent implements OnInit, OnDestroy {
  operazione: Operazione = {
    id: 0,
    idBanca: 0,
    idUtente: 0,
    funzionalita: 'Prelievo',
    quantita: 0,
    dataOperazione: new Date()
  };

  prelievoSuccesso: boolean = false;
  errorePrelievo: boolean = false;

  private routeSubscription: Subscription | null = null;

  constructor(
    private movimentiService: MovimentiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch the idBanca from the parent route snapshot
    const idBanca = +this.route.snapshot.parent?.params['idBanca'];
    if (!isNaN(idBanca)) {
      this.operazione.idBanca = idBanca;
    }

    // Fetch the idUtente from the child route parameters
    this.routeSubscription = this.route.params.subscribe(params => {
      const idUtente = +params['idUtente'];
      if (!isNaN(idUtente)) {
        this.operazione.idUtente = idUtente;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  effettuaPrelievo() {
    this.movimentiService.effettuaPrelievo(this.operazione.idUtente, this.operazione)
      .subscribe(
        response => {
          console.log('Risposta API:', response);
  
          // Verifica se la risposta contiene un messaggio di successo
          if (typeof response === 'string' && response.includes('Prelievo effettuato con successo')) {
            console.log('Prelievo effettuato con successo');
            // Gestisci il successo, ad esempio mostrando un messaggio all'utente
          } else {
            console.error('La risposta API non contiene un messaggio di successo valido');
            // Gestisci la situazione in cui la risposta non è quella attesa
          }
        },
        error => {
          console.error('Errore durante il prelievo', error);
          // Gestisci l'errore, ad esempio mostrando un messaggio di errore all'utente
        }
      );
  }
  
  
}
