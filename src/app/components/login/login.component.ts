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
  loginForm!: FormGroup;
  isPasswordVisible = false;
  loginError: string | null = null;
  idbanca: number | undefined;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm();
    this.rout.params.subscribe(params => {
      this.idbanca = +params['idBanca'];
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.adminService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.loginForm.reset();
          this.loginError = null; 
          this.router.navigate(['']);
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
