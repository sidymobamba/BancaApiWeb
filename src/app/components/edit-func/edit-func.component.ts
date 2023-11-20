import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private funzionalitaService: FunzionalitaService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idBanca = +params['idBanca'];
      this.funzionalitaService.getFunzionalita().subscribe(data => {
        this.funzionalita = data;
      });
    });
  }

  onCheckboxChange(funzione: any) {
    if (funzione.attiva) {
      // Aggiungi alla lista da salvare
      this.funzionalitaDaSalvare.push({ idFunzionalita: funzione.id, nome: funzione.nome });
    } else {
      // Rimuovi dalla lista se deselezionato (se necessario)
      this.funzionalitaDaSalvare = this.funzionalitaDaSalvare.filter(item => item.idFunzionalita !== funzione.id);
    }
  }

  onSubmit() {
    console.log('ID Banca:', this.idBanca);
    console.log('Funzionalità da salvare:', this.funzionalitaDaSalvare);

    this.funzionalitaService.updateFunzionalitaByBancaId(this.idBanca, this.funzionalitaDaSalvare).subscribe(
      () => {
        console.log('Funzionalità aggiornate con successo');
      },
      (error) => {
        console.error('Errore durante l\'aggiornamento delle funzionalità:', error);
      }
    );
  }  
}
