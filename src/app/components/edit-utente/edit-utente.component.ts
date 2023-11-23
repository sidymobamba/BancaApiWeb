import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/models/utente.model';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-edit-utente',
  templateUrl: './edit-utente.component.html',
  styleUrls: ['./edit-utente.component.css']
})
export class EditUtenteComponent implements OnInit {

  utenteDetails: Utente = {
    id: 0,
    idBanca: 0,
    nomeUtente: '',
    password: '',
    bloccato: false,
    Role: '',
    Token: ''
  };

  constructor(private route: ActivatedRoute, private utenteService: UtentiService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.utenteService.getUtente(id).subscribe(
          (response: any) => {
            this.utenteDetails = response;
          },
          (error: any) => {
            console.error('Errore durante il recupero dei dettagli dell\'utente:', error);
          }
        );
      }
    });
  }

  confermaAggiornamento() {
    const conferma = window.confirm('Sei sicuro di voler salvare le modifiche?');
    if (conferma) {
      this.updateUtente();
    }
  }

  confermaEliminazione() {
    const conferma = window.confirm('Sei sicuro di voler eliminare questo utente?');
    if (conferma) {
      this.deleteUtente(this.utenteDetails.id);
    }
  }

  updateUtente() {
    if (this.utenteDetails.id === undefined) {
      console.error('Id non definito');
      return;
    }

    this.utenteService.updateUtente(this.utenteDetails.id, this.utenteDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['dashboard', this.utenteDetails.idBanca, 'utenti']);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiornamento dell\'utente:', error);

          if (error.error && error.error.errors) {
            console.error('Errori di convalida:', error.error.errors);
          }
        }
      });
  }

  deleteUtente(id: number | undefined) {
    if (this.utenteDetails.id === undefined) {
      console.error('Id non definito');
      return;
    }

    this.utenteService.deleteUtente(id)
      .subscribe({
        next: (response) => {
          this.router.navigate(['dashboard', this.utenteDetails.idBanca, 'utenti']);
        }
      });
  }
}
