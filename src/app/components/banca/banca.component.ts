import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
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
  funzionalita$:Observable<Funzionalita[]> = new Observable<Funzionalita[]>();

  constructor(
    private route: ActivatedRoute, private funzionalitaService: FunzionalitaService, private router: Router ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(parentParams => {
      this.idBanca = +parentParams['idBanca'];
     this.funzionalita$ = this.funzionalitaService.getFunzionalitaByBancaId(this.idBanca)
    });
  }

  navigateToEditFunc() {
    this.router.navigate(['dashboard', this.idBanca, 'banche', 'edit', this.idBanca]);

  }
}
