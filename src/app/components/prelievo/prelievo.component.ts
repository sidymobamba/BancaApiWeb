import { Component, OnInit, OnDestroy } from '@angular/core';
import { Operazione } from 'src/app/models/operazione.model';
import { MovimentiService } from 'src/app/services/movimenti.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  feedbackMessaggio: string = '';

  private routeSubscription: Subscription | null = null;

  constructor(
    private movimentiService: MovimentiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idBanca = +this.route.snapshot.parent?.params['idBanca'];
    if (!isNaN(idBanca)) {
      this.operazione.idBanca = idBanca;
    }

    this.routeSubscription = this.route.params.subscribe(params => {
      const idUtente = +params['idUtente'];
      if (!isNaN(idUtente)) {
        this.operazione.idUtente = idUtente;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  confermaPrelievo() {
    const conferma = window.confirm(`Sei sicuro di voler ritirare ${this.operazione.quantita} EUR?`);

    if (conferma) {
      this.effettuaPrelievo();
    } else {
      // L'utente ha annullato la conferma
    }
  }

  effettuaPrelievo() {
    this.movimentiService.effettuaPrelievo(this.operazione.idUtente, this.operazione)
      .subscribe(
        (response: any) => {
          if (response instanceof HttpErrorResponse) {
            // Gestisci gli errori di parsing qui
            console.error('Errore durante il parsing della risposta:', response.message);
            this.errorePrelievo = true;
            return;
          }
  
          if (this.isPrelievoSuccesso(response)) {
            this.prelievoSuccesso = true;
            this.feedbackMessaggio = `Hai ritirato ${this.operazione.quantita} EUR con successo!`;
            // Aggiorna lo stato della vista o esegui altre azioni necessarie
          } else {
            console.error('La risposta API non contiene un messaggio di successo valido');
            this.errorePrelievo = true;
          }
        },
        error => {
          console.error('Errore durante il prelievo', error);
          this.errorePrelievo = true;
        }
      );
  }
  

  private isPrelievoSuccesso(response: any): boolean {
    // Implementa la logica per determinare se il prelievo è riuscito
    // Ad esempio, potresti verificare la presenza di un messaggio di successo nella risposta API
    return typeof response === 'string' && response.includes('Prelievo effettuato con successo');
  }
}
