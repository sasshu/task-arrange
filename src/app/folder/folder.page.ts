import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

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
          handler: () => {
            this.auth.authSignOut();
          },
        },
      ],
    });
    await alert.present();
  }
}
