import { Component, OnInit } from '@angular/core';
import { Operazione } from 'src/app/models/operazione.model';
import { MovimentiService } from 'src/app/services/movimenti.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-versamento',
  templateUrl: './versamento.component.html',
  styleUrls: ['./versamento.component.css']
})
export class VersamentoComponent implements OnInit {
  operazione: Operazione = {
    id: 0,
    idBanca: 0,
    idUtente: 0,
    funzionalita: 'Versamento',
    quantita: 0,
    dataOperazione: new Date()
  };

  versamentoSuccesso: boolean = false;
  erroreVersamento: boolean = false;
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

    this.route.params.subscribe(params => {
      const idUtente = +params['idUtente'];
      if (!isNaN(idUtente)) {
        this.operazione.idUtente = idUtente;
      }
    });
  }

  confermaVersamento() {
    const conferma = window.confirm(`Sei sicuro di voler versare ${this.operazione.quantita} EUR?`);

    if (conferma) {
      this.effettuaVersamento();
    } else {
    }
  }

  effettuaVersamento() {
    this.movimentiService.effettuaVersamento(this.operazione.idUtente, this.operazione)
      .subscribe(
        (response: any) => {
          if (response instanceof HttpErrorResponse) {
            console.error('Errore durante il parsing della risposta:', response.message);
            this.erroreVersamento = true;
            this.feedbackMessaggio = 'Errore durante il versamento. Controlla la quantità e riprova.';
            return;
          }

          if (this.isVersamentoSuccesso(response)) {
            this.versamentoSuccesso = true;
            this.feedbackMessaggio = `Hai versato ${this.operazione.quantita} EUR con successo!`;
          } else {
            console.error('La risposta API non contiene un messaggio di successo valido');
            this.erroreVersamento = true;
            this.feedbackMessaggio = 'Errore durante il versamento. Controlla la quantità e riprova.';
          }
        },
        error => {
          console.error('Errore durante il versamento', error);
          this.erroreVersamento = true;
          this.feedbackMessaggio = `Hai versato ${this.operazione.quantita} EUR con successo!`;
        }
      );
  }

  private isVersamentoSuccesso(response: any): boolean {
    return typeof response === 'string' && response.includes('Versamento effettuato con successo');
  }
}
