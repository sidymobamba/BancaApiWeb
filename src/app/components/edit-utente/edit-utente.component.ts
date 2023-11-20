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

  constructor(private route: ActivatedRoute, private utenteservice: UtentiService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.utenteservice.getUtente(id).subscribe(
          (response: any) => {
            this.utenteDetails = response;
          },
          (error: any) => {
            console.error('Error fetching user details:', error);
          }
        );
      }
    });
  }

  updateUtente() {
    if (this.utenteDetails.id === undefined) {
      console.error('Id is undefined');
      return;
    }
  
    this.utenteservice.updateUtente(this.utenteDetails.id, this.utenteDetails)
      .subscribe({
        next: (response) => {
          this.router.navigate(['dashboard', this.utenteDetails.idBanca, 'utenti']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
  
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      });
  }

  deleteUtente(id: number | undefined){
    if (this.utenteDetails.id === undefined) {
      console.error('Id is undefined');
      return;
    }
    this.utenteservice.deleteUtente(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['dashboard', this.utenteDetails.idBanca, 'utenti']);
      }
    });
  }
  
  
  
}
