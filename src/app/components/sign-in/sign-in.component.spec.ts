import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
      ],
      providers: [ AuthService ],
      declarations: [AppComponent, DashboardComponent, SignInComponent, SignUpComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.signIn() when onSubmit() is called', () => {
    spyOn(authService, 'signIn').and.returnValue(Promise.resolve());
    component.onSubmit();
    expect(authService.signIn).toHaveBeenCalled();
  });

  it('should display an error message for wrong username', fakeAsync(() => {
    authService.isLoggedIn$ = of(false);
    const usernameInput = fixture.nativeElement.querySelector('input[name="username"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    usernameInput.value = 'wrongusername';
    passwordInput.value = 'password';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(authService, 'signIn').and.returnValue(
      Promise.reject({message: 'Wrong username or password'})
    );

    debugger
    component.onSubmit();
    
    tick(10);
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('div.error-message');
    expect(errorMessage.textContent).toContain('Wrong username or password');

    
  }));

});
