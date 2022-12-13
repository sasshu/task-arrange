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

  task: ITask | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public getData: GetDataService,
    public popOverController: PopoverController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
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
      cssClass: 'custom-popover',
      alignment: 'center',
      size: 'auto',
      animated: true,
    });
    return await popover.present();
  }

  addTask() {
    this.getData.taskList.push(this.task!);
    this.task = null;
  }
}
