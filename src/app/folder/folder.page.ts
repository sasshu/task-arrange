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
  task!: ITask;

  sleep = (sec: number) =>
    new Promise((resolve) => setTimeout(resolve, sec * 1000));

  constructor(
    private activatedRoute: ActivatedRoute,
    public getData: GetDataService,
    public popOverController: PopoverController
  ) {
    this.task = this.initTask(this.task);
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // タスクの初期化
  initTask(task: ITask) {
    task = {
      text: '',
      label: '',
      deadline: '',
      updated: new Date(),
      pageview: 1,
      ispinned: false,
    };
    return task;
  }

  // タスク内テキストをクリップボードにコピー
  getCopy(n: number) {
    navigator.clipboard.writeText(this.getData.taskList[n].text).then(() => {
      const elem = document.getElementsByClassName('copy-msg')[
        n
      ] as HTMLElement;
      elem!.style.visibility = 'visible';
      setTimeout(() => {
        elem!.style.visibility = 'hidden';
      }, 2000);
    });
  }

  // タスク編集画面の表示
  async showEditor(data: ITask) {
    const popover = await this.popOverController.create({
      component: EditorComponent,
      componentProps: { DATA: data },
    });

    popover.onDidDismiss().then(() => {
      if (data.text == '') {
        const list = this.getData.taskList;
        list.splice(list.indexOf(data), 1);
      }
    });
    return await popover.present();
  }

  // タスク完了
  finishTask() {}

  // タスク追加
  addTask() {
    this.showEditor(this.task).then(() => {
      this.getData.taskList.push(this.task);
      this.task = this.initTask(this.task);
    });
  }

  // タスク削除
  deleteTask(n: number) {
    const list = this.getData.taskList;
    this.sleep(0.3).then(() => {
      list.splice(list.indexOf(list[n]), 1);
    });
  }

  // タスクのピン止め
  pinTask(n: number) {
    const list = this.getData.taskList;
    const tTask = list[n];

    tTask.ispinned = !tTask.ispinned;

    this.sleep(0.3).then(() => {
      if (list.length > 1) {
        list.splice(list.indexOf(list[n]), 1);

        for (let i = 0; i < list.length; i++) {
          if (!list[i].ispinned) {
            list.splice(i, 0, tTask);
            break;
            // 全てにピンが打ってある場合
          } else if (i == list.length - 1) {
            list.push(tTask);
            break;
          }
        }
      }
    });
  }
}
