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
      deadline: '2022-12-31T23:59:59',
      updated: '2022-12-10T20:05:32',
      pageview: 3,
    },
    {
      text: '英語の勉強',
      label: '勉強',
      deadline: '2022-12-15T00:00:00',
      updated: '2022-12-01T15:39:10',
      pageview: 3,
    },
    {
      text: 'プレゼント買う',
      label: 'お出かけ',
      deadline: '2022-12-24T00:00:00',
      updated: '2022-11-29T18:39:40',
      pageview: 23,
    },
    {
      text: '6時に起きる',
      label: '勉強',
      deadline: '2022-12-24T06:00:00',
      updated: '2022-12-01T15:40:15',
      pageview: 1,
    },
    {
      text: '部屋決める',
      label: '部屋探し',
      deadline: '2023-02-05T00:00:00',
      updated: '2022-12-01T15:39:10',
      pageview: 7,
    },
    {
      text: '埼玉に行く',
      label: '部屋探し',
      deadline: '2023-01-14T00:00:00',
      updated: '2022-12-05T17:41:42',
      pageview: 10,
    },
  ];
  constructor() {}
}
