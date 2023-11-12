import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente.model';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {

  utenti: Utente[] = [
    {
      id: 0,
      idBanca: 0,
      banca: null,
      nomeUtente: '',
      password: '',
      bloccato: 0
    }
  ]

  constructor(private utentiService: UtentiService) {}

  ngOnInit(): void {
    this.utentiService.getAllUtentti()
      .subscribe({
        next: (utentis) => {
          this.utenti = utentis; 
        },
        error: (response) => {
          console.log(response);
        }
      });
    
  }

}
