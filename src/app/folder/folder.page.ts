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
      tags: [],
      updated: new Date(),
      pageview: 1,
      ispinned: false,
    };
    return task;
  }

  // タスク内テキストをクリップボードにコピー
  getCopy(task: ITask) {
    navigator.clipboard.writeText(task.text).then(() => {
      const elem = document.getElementsByClassName('copy-msg')[
        this.getData.taskList.indexOf(task)
      ] as HTMLElement;
      elem!.style.visibility = 'visible';
      setTimeout(() => {
        elem!.style.visibility = 'hidden';
      }, 2000);
    });
  }

  // タスク編集
  async showEditor(task: ITask) {
    const popover = await this.popOverController.create({
      component: EditorComponent,
      componentProps: { DATA: task },
    });

    popover.onDidDismiss().then(() => {
      if (task.text == '') {
        const list = this.getData.taskList;
        list.splice(list.indexOf(task), 1);
      }
    });
    return await popover.present();
  }

  // タスク追加
  addTask() {
    this.showEditor(this.task).then(() => {
      this.getData.taskList.push(this.task);
      this.task = this.initTask(this.task);
    });
  }

  // タスク削除
  deleteTask(task: ITask) {
    const list = this.getData.taskList;
    this.sleep(0.3).then(() => {
      list.splice(list.indexOf(task), 1);
    });
  }

  // タスクのピン止め
  pinTask(task: ITask) {
    const list = this.getData.taskList;

    task.ispinned = !task.ispinned;

    this.sleep(0.3).then(() => {
      if (list.length > 1) {
        list.splice(list.indexOf(task), 1);

        for (let i = 0; i < list.length; i++) {
          if (!list[i].ispinned) {
            list.splice(i, 0, task);
            break;
            // 全てにピンが打ってある場合
          } else if (i == list.length - 1) {
            list.push(task);
            break;
          }
        }
      }
    });
  }

  // タスクのクリック
  clickTask(data: ITask, e: Event) {
    const clickArea = e.target as HTMLTextAreaElement;
    // console.log(clickArea.className);
    if (
      !clickArea.closest('.detail-button') &&
      !clickArea.closest('.tag-wrapper') &&
      !clickArea.closest('.top-button')
    ) {
      this.showEditor(data);
    }
  }

  // タスク完了
  finishTask() {}

  // タグの編集
  editTags(task: ITask) {}

  // タグの削除
  deleteTags(task: ITask, tag: string) {
    this.sleep(0.3).then(() => {
      task.tags.splice(task.tags.indexOf(tag), 1);
    });
  }
}
