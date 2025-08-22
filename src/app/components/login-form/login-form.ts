import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  imports: [JsonPipe, CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  submissionResult: any = null;
  defName: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(form: any) {
    if (form.valid) {
      this.authService.login(form.value.defName, form.value.password).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          this.submissionResult = res;
          this.router.navigate(['/dashboard']);

        },
        error: (err) => {
          console.error('Login failed:', err);
          this.submissionResult = { error: 'Login failed' };
        }
      });
    }
  }
}
