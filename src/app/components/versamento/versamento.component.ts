import { Component, OnInit } from '@angular/core';
import { Operazione } from 'src/app/models/operazione.model';
import { MovimentiService } from 'src/app/services/movimenti.service';
import { ActivatedRoute } from '@angular/router';

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
    this.route.params.subscribe(params => {
      const idUtente = +params['idUtente'];
      if (!isNaN(idUtente)) {
        this.operazione.idUtente = idUtente;
      }
    });
  }

  effettuaVersamento() {
    this.movimentiService.effettuaVersamento(this.operazione.idUtente, this.operazione)
      .subscribe(
        response => {
          console.log('Versamento effettuato con successo', response);
          // Handle success, e.g., show a success message
        },
        error => {
          console.error('Errore durante il versamento', error);
          // Handle error, e.g., show an error message
        }
      );
  }
}
