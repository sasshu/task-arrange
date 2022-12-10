export const firebaseError: any = {
  'auth/invalid-email': {
    code: 'error: メールアドレス',
    message: 'メールアドレスのフォーマットが間違っています。',
  },
  'auth/wrong-password': {
    code: 'error: パスワード',
    message: 'パスワードが間違っています。',
  },
  'auth/weak-password': {
    code: 'error: パスワード',
    message: '最低6文字以上のパスワードを入力してください。',
  },
  'auth/user-not-found': {
    code: '存在しないアカウント',
    message: '入力いただいたアカウントは存在しません。',
  },
  'auth/email-already-in-use': {
    code: '存在するアカウント',
    message: 'このメールアドレスを利用したアカウントが既に作成されています。',
  },
  'auth/network-request-failed': {
    code: 'error: ネットワーク',
    message: 'ネットワークエラーが発生しました。',
  },
};
