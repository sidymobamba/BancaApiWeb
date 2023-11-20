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


  constructor(
    private utenteService: UtentiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
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
      // If the form is valid, you can proceed with form submission
      const utenteDetails = this.utenteForm.value;
  
      // Call the service to add the utente
      this.utenteService.addUtente(utenteDetails).subscribe({
        next: (response) => {
          // Handle success, e.g., navigate to a different page
          this.router.navigate(['dashboard', utenteDetails.idBanca, 'utenti']);
        },
        error: (error) => {
          // Handle error, log or display an error message
          console.error('Error adding utente:', error);
  
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        }
      });
    } else {
      // If the form is invalid, you might want to show an error message or take appropriate action
      console.error('Form is invalid. Please check the fields.');
    }
  }
  
}
