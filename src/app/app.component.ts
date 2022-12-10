import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email: string | null = null;
  isFirst: boolean = true;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(public afAuth: Auth, public auth: AuthService) {
    this.redraw();
    this.isFirst = true;
  }

  redraw() {
    // 初回のみ実行
    if (this.isFirst) {
      let unsbscribe = this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email;
        } else {
          this.email = null;
        }
        unsbscribe();
      });
      this.isFirst = false;
    }
  }
}
