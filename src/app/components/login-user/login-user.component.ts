import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  isPasswordVisible = false;
  loginError: string | null = null;
  idBanca: number;

  constructor(
    private fb: FormBuilder,
    private utenteService: UtentiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.idBanca = 0; 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idBanca = +params['idBanca'];
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const adminCredentials = { ...this.loginForm.value, idBanca: this.idBanca };

      this.utenteService.login(adminCredentials, this.idBanca).subscribe({
        next: (userData) => {
          console.log('Login successful:', userData);
          this.loginForm.reset();
          this.loginError = null;
          this.router.navigate(['/dashboard', this.idBanca, 'banche']);

        },
        error: (err) => {
          this.loginError = err.message || 'Invalid username or password. Please try again.';
          console.error('Login error:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
