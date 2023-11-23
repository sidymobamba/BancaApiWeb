import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunzionalitaService } from 'src/app/services/funzionalita.service';

@Component({
  selector: 'app-edit-func',
  templateUrl: './edit-func.component.html',
  styleUrls: ['./edit-func.component.css']
})
export class EditFuncComponent {
  funzionalita: any[] = [];
  idBanca!: number;
  funzionalitaDaSalvare: any[] = [];

  constructor(private funzionalitaService: FunzionalitaService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.idBanca = +params['idBanca'];
      this.funzionalitaService.getFunzionalita().subscribe(data => {
        this.funzionalita = data;
      });
    });
  }

  onCheckboxChange(funzione: any) {
    if (funzione.attiva) {
      this.funzionalitaDaSalvare.push({ id: funzione.id, nome: funzione.nome });
    } else {
      this.funzionalitaDaSalvare = this.funzionalitaDaSalvare.filter(item => item.id !== funzione.id);
    }
  }

  onSubmit() {
    const conferma = window.confirm('Sei sicuro di voler salvare le modifiche?');

    if (conferma) {
      this.funzionalitaService.aggiungiFunzionalita(this.idBanca, this.funzionalitaDaSalvare)
        .subscribe(() => {
          this.funzionalitaDaSalvare = [];
          this.funzionalitaService.getFunzionalita().subscribe(data => {
            this.funzionalita = data;
            this.router.navigate(['dashboard', this.idBanca, 'banche']);
          });
        });
    } else {
    }
  }
}
