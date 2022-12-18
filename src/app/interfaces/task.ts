export interface ITask {
  text: string;
  label: string;
  tags: string[];
  updated: Date;
  pageview: number;
  ispinned: boolean;
}
