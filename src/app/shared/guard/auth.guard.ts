import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }


  canActivate(): Observable<boolean> {
    return this.authService.userFirebase$.pipe(
      take(1),
      map(userFirebase => !!userFirebase),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/sign-in']);
        }
      })
    );
  }
}
