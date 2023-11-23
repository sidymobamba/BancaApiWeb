import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/models/utente.model';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-add-utente',
  templateUrl: './add-utente.component.html',
  styleUrls: ['./add-utente.component.css']
})
export class AddUtenteComponent implements OnInit {
  utenteForm!: FormGroup;
  idBanca!: number;


  constructor(
    private utenteService: UtentiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.idBanca = +this.route.snapshot.parent?.params['idBanca'];
   
    
  }

  private initForm(): void {
    this.utenteForm = this.fb.group({
      idBanca: [0, Validators.required],
      nomeUtente: ['', Validators.required],
      password: ['', Validators.required],
      bloccato: [false, Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.utenteForm.valid) {
      const utenteDetails = this.utenteForm.value;
  
      this.utenteService.addUtente(utenteDetails).subscribe({
        next: (response) => {
          this.router.navigate(['dashboard', utenteDetails.idBanca, 'utenti']);
        },
        error: (error) => {
          console.error('Error adding utente:', error);
  
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      });
    } else {
      console.error('Form is invalid. Please check the fields.');
    }
  }
  
}
