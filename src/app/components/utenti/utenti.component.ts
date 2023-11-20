import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      bloccato: false,
      Role: '',
      Token: ''
    }
  ]

  idBanca!: number;

  constructor(private utentiService: UtentiService, private route: ActivatedRoute, private router: Router) {}

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

  navigateToAddUtente(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  
  

}
