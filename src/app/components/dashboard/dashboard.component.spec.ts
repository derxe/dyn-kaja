import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { SignInComponent } from '../sign-in/sign-in.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
