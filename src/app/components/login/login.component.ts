import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isPasswordVisible = false;
  loginError: string | null = null;
  idBanca: number;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
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

      this.adminService.login(adminCredentials, this.idBanca).subscribe({
        next: (adminData) => {
          console.log('Login successful:', adminData);
          this.loginForm.reset();
          this.loginError = null;
          this.router.navigate(['/dashboard', this.idBanca, 'banche']);

        },
        error: (err) => {
          this.loginError = 'Invalid username or password. Please try again.';
          console.error('Login error:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
