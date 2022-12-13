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

  constructor(private navParams: NavParams) {
    this.task = this.navParams.get('DATA');
  }

  ngOnInit() {}
}
