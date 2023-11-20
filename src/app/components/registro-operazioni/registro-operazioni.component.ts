import { Component, OnInit } from '@angular/core';
import { MovimentiService } from 'src/app/services/movimenti.service';
import { Operazione } from 'src/app/models/operazione.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-operazioni',
  templateUrl: './registro-operazioni.component.html',
  styleUrls: ['./registro-operazioni.component.css']
})
export class RegistroOperazioniComponent implements OnInit {
  operazioni: Operazione[] = [];
  operazione: Operazione = {
    id: 0,
    idBanca: 0,
    idUtente: 0,
    funzionalita: 'Prelievo',
    quantita: 0,
    dataOperazione: new Date()
  };
  idUtente: number = 0; 
  displayedColumns: string[] = ['id', 'funzionalita', 'quantita', 'dataOperazione'];
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
    this.movimentiService.getRegistroOperazioni(this.operazione.idUtente)
      .subscribe(
        (response: Operazione[]) => {
          this.operazioni = response;
        },
        error => {
          console.error('Error fetching operation log', error);
          // Handle error, e.g., show an error message
        }
      );
  }
}
