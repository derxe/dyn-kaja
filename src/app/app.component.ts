import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}


  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['sign-in']);
    }).catch(() => {
      alert("Error: Unable to sign out.")
    });
  }

}
