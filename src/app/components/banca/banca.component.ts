import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { banca } from 'src/app/models/banca.model';
import { Funzionalita } from 'src/app/models/funzionalita.model';
import { BancaService } from 'src/app/services/banca.service';
import { FunzionalitaService } from 'src/app/services/funzionalita.service';

@Component({
  selector: 'app-banca',
  templateUrl: './banca.component.html',
  styleUrls: ['./banca.component.css']
})
export class BancaComponent implements OnInit {
  idBanca!: number;
  funzionalita!: Funzionalita[];

  constructor(
    private route: ActivatedRoute, private funzionalitaService: FunzionalitaService, private router: Router ) {}

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
  }

  navigateToEditFunc() {
    this.router.navigate(['dashboard', this.idBanca, 'banche', 'edit', this.idBanca]);

  }
}
