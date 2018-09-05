import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';


import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;
  errorMsg: string;

  constructor(private afAuth: AngularFireAuth,private db: AngularFireDatabase,private router: Router) {
      this.user = afAuth.authState;
    }

    authUser() {
      return this.user;
    }

    get currentUserId(): string {
      console.log("=== "+this.authState.uid)
      return this.authState !== null ? this.authState.uid : '';
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }

    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
      this.setUserStatus('offline');
    }

    signUp(email: string, password: string,country: string ,displayName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email,country ,displayName, status);
              }).catch(error => console.log(error));
    }
    edit(email: string,displayName: string,userID: string) {
      console.log("uid in Edit: "+userID);
      const path = `users/${userID}`;
      const data = {
        displayName: displayName,
      };
      this.db.object(path).update(data)
        .catch(error => console.log(error));        
    }

    setUserData(email: string,country: string, displayName: string, status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        country:country,
        displayName: displayName,
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
}
