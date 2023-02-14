import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { tap, map, take, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  public userFirebase$: Observable<any>
  public isLoggedIn$: Observable<any>

  public user$: Observable<User | undefined>;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore
  ) {
    this.userFirebase$ = this.afAuth.authState;
    this.isLoggedIn$ = this.userFirebase$.pipe(
      map(userFirebase => !!userFirebase),
      tap(loggedIn => {
        console.log(`User is logged in: ${loggedIn}`)
      })
    );

    this.user$ = this.userFirebase$.pipe(
      switchMap(userFirebase => {
        const userId = userFirebase.uid;
        const userDoc = this.afs.doc<User>(`users/${userId}`);
        return userDoc.valueChanges()
      })
    )
  }

  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  signUp(email: string, password: string, displayName: string, favouriteTeam?: string): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user) {
          const userData: User = {
            uid: result.user.uid,
            email: result.user.email,
            displayName: displayName,
            favouriteTeam: favouriteTeam
          };

          let userDoc = this.afs.doc<User>(`users/${userData.uid}`);
          return userDoc.set(userData, { merge: true }); 
        } else {
          return null;
        }
      })
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

}