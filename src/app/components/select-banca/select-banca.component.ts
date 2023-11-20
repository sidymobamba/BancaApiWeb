// Importa i moduli Angular Material necessari
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { banca } from 'src/app/models/banca.model';
import { BancaService } from 'src/app/services/banca.service';

@Component({
  selector: 'app-select-banca',
  templateUrl: './select-banca.component.html',
  styleUrls: ['./select-banca.component.css']
})
export class SelectBancaComponent implements OnInit {
  banche: banca[] = [];
  selectedBanca: number | null = null;

  constructor(private bancaService: BancaService, private router: Router) { }

  ngOnInit(): void {
    this.bancaService.getAllBanks().subscribe(data => {
      this.banche = data;
    });
  }

  onBancaSelected(): void {
    // Navigate to the login page with the selected bancaId
    if (this.selectedBanca !== null) {
      this.router.navigate(['/sceltaGestione', this.selectedBanca]);
    }
  }
}
