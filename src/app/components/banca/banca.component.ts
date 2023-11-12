import { Component, OnInit } from '@angular/core';
import { banca } from 'src/app/models/banca.model';
import { BancaService } from 'src/app/services/banca.service';

@Component({
  selector: 'app-banca',
  templateUrl: './banca.component.html',
  styleUrls: ['./banca.component.css']
})
export class BancaComponent  implements OnInit{
  
banche: banca[] = [
  {
    id: 1,
    nome: 'BPM'
  },
  {
    id: 2,
    nome: 'Fineco'
  }
]
constructor(private bancaService: BancaService) {}

ngOnInit(): void {
  this.bancaService.getAllBanks()
    .subscribe({
      next: (banche) => {
        this.banche = banche; 
      },
      error: (response) => {
        console.log(response);
      }
    });
  
}
    

}
