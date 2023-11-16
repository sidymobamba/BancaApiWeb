import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      nomeUtente: '',
      password: '',
      bloccato: 0
    }
  ]

  idBanca!: number;

  constructor(private utentiService: UtentiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.utentiService.getAllUtentti()
    //   .subscribe({
    //     next: (utentis) => {
    //       this.utenti = utentis; 
    //     },
    //     error: (response) => {
    //       console.log(response);
    //     }
    //   });

    this.route.parent?.params.subscribe(parentParams => {
      this.idBanca = +parentParams['idBanca'];
      
      this.utentiService.getUtentiByBancaId(this.idBanca).subscribe({
        next: (utentis) => {
          this.utenti = utentis; 
        },
        error: (response) => {
          console.log(response);
        }
      });
    
    });
  }

}
