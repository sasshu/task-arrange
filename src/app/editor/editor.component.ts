import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ITask } from '../interfaces/task';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  task: ITask;
  updated: string;

  constructor(private navParams: NavParams) {
    this.task = this.navParams.get('DATA');

    const now = new Date();
    const last = this.task.updated;
    const slast = this.dateToString(this.task.updated);

    if (now.getFullYear() > last.getFullYear()) {
      this.updated = slast.slice(0, 10);
    } else if (now.getDate() > last.getDate()) {
      this.updated = slast.slice(5, 10);
    } else {
      this.updated = slast.slice(-5);
    }
  }

  ngOnInit() {}

  updateTask() {
    this.task.updated = new Date();
    this.updated = this.dateToString(this.task.updated).slice(-5);
  }

  // 日付型を文字列に変換
  dateToString(tdate: Date) {
    const year = String(tdate.getFullYear());
    const month = ('0' + String(tdate.getMonth() + 1)).slice(-2);
    const date = ('0' + String(tdate.getDate())).slice(-2);
    const hour = ('0' + String(tdate.getHours())).slice(-2);
    const minute = ('0' + String(tdate.getMinutes())).slice(-2);
    return year + '/' + month + '/' + date + ' ' + hour + ':' + minute;
  }
}
