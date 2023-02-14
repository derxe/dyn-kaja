import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


interface SignInForm {
  username: string,
  password: string
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  form: SignInForm  = {
    username: "",
    password: ""
  };

  errorMessage = null;

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.signIn(username, password)
    .then((result) => {
      debugger;
      this.errorMessage = null;
      this.router.navigate(['dashboard']);
    })
    .catch((error) => {
      this.errorMessage = error.message;
    });
  }


}
