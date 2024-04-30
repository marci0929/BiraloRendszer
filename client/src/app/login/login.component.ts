import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    setTimeout(() => {
      if (this.email && this.password) {
        this.errorMessage = '';
        this.authService.login(this.email, this.password).subscribe({
          next: (data) => {
            if (data) {
              this.router.navigateByUrl('/user-management');
            }
          }, error: (err) => {
            console.log(err);
          },
        })
      } else {
        this.errorMessage = 'Form is empty.';
      }
    }, 1500);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
