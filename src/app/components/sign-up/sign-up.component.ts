import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  favouriteTeam?: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  form: SignUpForm = {
    username: "",
    email: "",
    favouriteTeam: "",
    password: ""
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  onSubmit(): void {
    const { email, password, username, favouriteTeam } = this.form;

    this.authService.signUp(email, password, username, favouriteTeam)
      .then((result) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log("loggin in", result)
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        this.isSignUpFailed = true;
        this.errorMessage = error.message
      });
  }

}
