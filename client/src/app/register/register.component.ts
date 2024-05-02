import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioButton, MatRadioModule, MatRadioGroup } from '@angular/material/radio'
import { User } from '../model/User';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [MatRadioModule, MatRadioButton, ReactiveFormsModule, MatRadioGroup, CommonModule],
  standalone: true,
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      rank: [''],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('pass', 'confirmPassword')
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    console.log('Form data:', this.signupForm.value);

    const user: User =
    {
      email: this.signupForm.value["email"],
      name: this.signupForm.value["name"],
      pass: this.signupForm.value["pass"],
      rank: this.signupForm.value["rank"]
    };
    this.authService.register(this.signupForm.value).subscribe({
      next: (data) => {
        let rank = this.signupForm.value["rank"]
        let rank_val = 0;
        switch (rank) {
          case "biralo": rank_val = 1;
            break;
          case "szerkeszto": rank_val = 2;
            break;
          case "szerzo": rank_val = 3;
            break;
        }
        sessionStorage.setItem("user_rank", rank_val.toString());
        sessionStorage.setItem("currentUserEmail", user.email);
        this.router.navigateByUrl("/home");
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });

  }
}
