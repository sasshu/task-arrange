import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { AlertController } from '@ionic/angular';
import { GetDataService } from './data/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email: string | null = null;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    public afAuth: Auth,
    public auth: AuthService,
    public alertController: AlertController,
    public getData: GetDataService
  ) {
    this.redraw();
  }

  // メールアドレスの再読み込み
  redraw() {
    let unsbscribe = this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
      } else {
        this.email = null;
      }
      unsbscribe();
    });
  }

  // ログアウト
  async signOut() {
    const alert = await this.alertController.create({
      header: 'ログアウトしますか？',
      buttons: [
        {
          text: 'キャンセル',
        },
        {
          text: 'ログアウト',
          cssClass: 'logout-button-confirm',
          handler: async () => {
            await this.auth.authSignOut();
            await this.redraw();
          },
        },
      ],
    });
    await alert.present();
  }
}
