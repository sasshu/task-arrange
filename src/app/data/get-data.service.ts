import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  taskList: ITask[] = [
    {
      text: '願書提出',
      label: '事務作業',
      tags: ['受験'],
      updated: new Date(2022, 11, 1, 17, 46),
      pageview: 3,
      ispinned: false,
    },
    {
      text: '英語の勉強',
      label: '勉強',
      tags: ['受験', '毎日やる'],
      updated: new Date(2021, 8, 24, 23, 51),
      pageview: 3,
      ispinned: false,
    },
    {
      text: 'プレゼント買う',
      label: 'お出かけ',
      tags: ['クリスマス'],
      updated: new Date(2022, 11, 2, 7, 30),
      pageview: 23,
      ispinned: false,
    },
    {
      text: '6時に起きる',
      label: '勉強',
      tags: [],
      updated: new Date(2022, 10, 12, 18, 40),
      pageview: 1,
      ispinned: false,
    },
    {
      text: '部屋決める',
      label: '部屋探し',
      tags: [],
      updated: new Date(2022, 11, 16, 17, 57),
      pageview: 7,
      ispinned: false,
    },
    {
      text: '埼玉に行く',
      label: '部屋探し',
      tags: ['旅行', '東横イン'],
      updated: new Date(2022, 11, 11, 18, 17),
      pageview: 10,
      ispinned: false,
    },
  ];
  constructor() {}
}
