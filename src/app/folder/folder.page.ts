import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../data/get-data.service';
import { ITask } from '../interfaces/task';
import { PopoverController } from '@ionic/angular';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  task: ITask = {
    text: '',
    label: '',
    deadline: '',
    updated: '',
    pageview: 1,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public getData: GetDataService,
    public popOverController: PopoverController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  initTask(task: ITask) {
    task = {
      text: '',
      label: '',
      deadline: '',
      updated: '',
      pageview: 1,
    };
    return task;
  }

  getCopy(n: number) {
    navigator.clipboard.writeText(this.getData.taskList[n].text).then(() => {
      let elem = document.getElementsByClassName('copy-msg')[n] as HTMLElement;
      elem!.style.visibility = 'visible';
      setTimeout(() => {
        elem!.style.visibility = 'hidden';
      }, 2000);
    });
  }

  async showEditor(data: ITask) {
    const popover = await this.popOverController.create({
      component: EditorComponent,
      componentProps: { DATA: data },
    });

    popover.onDidDismiss().then(() => {
      if (data.text == '') {
        let list = this.getData.taskList;
        this.getData.taskList.splice(list.indexOf(data), 1);
      }
    });
    return await popover.present();
  }

  addTask() {
    this.showEditor(this.task).then(() => {
      this.getData.taskList.push(this.task);
      this.task = this.initTask(this.task);
    });
  }
}
