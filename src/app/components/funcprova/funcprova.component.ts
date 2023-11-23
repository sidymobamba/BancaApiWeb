import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Funzionalita } from 'src/app/models/funzionalita.model';
import { FunzionalitaService } from 'src/app/services/funzionalita.service';

@Component({
  selector: 'app-funcprova',
  templateUrl: './funcprova.component.html',
  styleUrls: ['./funcprova.component.css']
})
export class FuncprovaComponent implements OnInit {
  idBanca!: number;
  funzionalita: Funzionalita[] = [];
  private routeSubscription: Subscription | null = null;
  idUtente!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private funzionalitaService: FunzionalitaService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(parentParams => {
      this.idBanca = +parentParams['idBanca'];

      this.funzionalitaService.getFunzionalitaByBancaId(this.idBanca).subscribe({
        next: (funzionalita) => {
          this.funzionalita = funzionalita;
        },
        error: (err) => {
          console.error('Errore nel recupero delle funzionalità:', err);
        },
      });
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      this.idUtente = +params['idUtente'];
    });
  }
  getIconByFunzione(funzioneNome: string): string {
    switch (funzioneNome.toLowerCase()) {
      case 'prelievo':
        return 'money'; // Sostituisci con il nome dell'icona MatIcon appropriata
      case 'versamento':
        return 'attach_money'; // Sostituisci con il nome dell'icona MatIcon appropriata
      case 'saldo':
        return 'account_balance_wallet'; // Sostituisci con il nome dell'icona MatIcon appropriata
      case 'registro operazioni':
        return 'list_alt'; // Sostituisci con il nome dell'icona MatIcon appropriata
      default:
        return 'info'; // Icona di default o gestisci altri casi a tuo piacimento
    }
  }
  

  navigateToFunzione(idUtente: number, nomeFunzione: string) {
    switch (nomeFunzione.toLowerCase()) {
      case 'versamento':
        this.router.navigate([`/dashboardUser/${this.idBanca}/versamento/${this.idUtente}`]);
        break;
      case 'prelievo':
        this.router.navigate([`/dashboardUser/${this.idBanca}/prelievo/${this.idUtente}`]);
        break;
      case 'saldo':
        this.router.navigate([`/dashboardUser/${this.idBanca}/saldo/${this.idUtente}`]);
        break;
      case 'registro operazioni':
        this.router.navigate([`/dashboardUser/${this.idBanca}/registroOperazioni/${this.idUtente}`]);
        break;
      default:
        break;
    }
  }
}
