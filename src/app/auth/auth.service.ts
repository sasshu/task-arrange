import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { firebaseError } from './firebase.error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: string | null = null;
  constructor(
    public afAuth: Auth,
    public navController: NavController,
    public alertCotroller: AlertController
  ) {}

  authSignUp(login: { email: string; password: string }) {
    return createUserWithEmailAndPassword(
      this.afAuth,
      login.email,
      login.password
    )
      .then(async () => {
        this.navController.navigateForward('/');
        // this.email = this.getEmailAddress();
      })
      .catch((error) => {
        this.alertError(error);
        throw error;
      });
  }

  authSignIn(login: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.afAuth, login.email, login.password)
      .then(async () => {
        this.navController.navigateForward('/');
        // this.email = this.getEmailAddress();
      })
      .catch((error) => {
        this.alertError(error);
        throw error;
      });
  }

  authSignOut() {
    return signOut(this.afAuth)
      .then(() => {
        this.navController.navigateRoot('/auth/signin');
        // this.email = this.getEmailAddress();
      })
      .catch(async (error) => {
        this.alertError(error);
        throw error;
      });
  }

  async alertError(e: any) {
    if (firebaseError.hasOwnProperty(e.code)) {
      e = firebaseError[e.code];
    }
    const alert = await this.alertCotroller.create({
      header: e.code,
      message: e.message,
      buttons: ['閉じる'],
    });
    await alert.present();
  }

  // getEmailAddress() {
  //   let email: string | null = null;
  //   let unsbscribe = this.afAuth.onAuthStateChanged((user) => {
  //     if (user) {
  //       email = user.email;
  //     }
  //     unsbscribe();
  //   });
  //   return email;
  // }
}
