import { Injectable } from '@angular/core';
import { ITaskList } from '../interfaces/task-list';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  taskList: ITaskList[] = [
    {
      text: '願書提出',
      deadline: '2022年12月31日',
      label: '事務作業',
      priority: 1,
    },
    {
      text: '英語の勉強',
      deadline: '2022年12月15日',
      label: '勉強',
      priority: 4,
    },
    {
      text: 'プレゼント買う',
      deadline: '2022年12月24日',
      label: 'お出かけ',
      priority: 5,
    },
    {
      text: '6時に起きる',
      deadline: '2022年12月24日',
      label: '勉強',
      priority: 6,
    },
    {
      text: '部屋決める',
      deadline: '2023年2月5日',
      label: '部屋探し',
      priority: 3,
    },
    {
      text: '埼玉に行く',
      deadline: '2022年1月14日',
      label: '部屋探し',
      priority: 2,
    },
  ];
  constructor() {}
}
