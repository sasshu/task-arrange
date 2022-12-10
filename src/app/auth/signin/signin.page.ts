import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  // ロード中か判断
  loading: boolean = false;

  // 認証情報
  login: {
    email: string;
    password: string;
  } = {
    email: '',
    password: '',
  };
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.loading = true;
    this.auth.authSignIn(this.login).finally(() => (this.loading = false));
  }
}
