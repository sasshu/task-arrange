import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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

  signUp() {
    this.loading = true;
    this.auth.authSignUp(this.login).finally(() => (this.loading = false));
  }
}
