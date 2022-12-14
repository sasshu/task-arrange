import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ITask } from '../interfaces/task';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  task: ITask;

  // フォーカスの有無
  labelFocus: boolean = false;
  textFocus: boolean = false;

  constructor(
    private navParams: NavParams,
    public popOverController: PopoverController
  ) {
    this.task = this.navParams.get('DATA');
  }

  ngOnInit() {}
}
