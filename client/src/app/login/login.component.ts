import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  pass: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    if (this.email && this.pass) {
      this.errorMessage = '';
      this.authService.login(this.email, this.pass).subscribe({
        next: (data) => {
          console.log(data)
          if (data) {
            sessionStorage.setItem("user_rank", (data as User).rank ?? "");
            sessionStorage.setItem("currentUserEmail", this.email);
            this.navigate('/');
          }
        }, error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.errorMessage = 'Form is empty.';
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
