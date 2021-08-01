import { Task } from './Task';

export enum FiltersValues {
  'All',
  'Completed',
  'InCompleted'
}

export interface IAppHandlers {
  getStateFilter(): Promise<Task[]>,
  createTask(text: string): void,
  editTask(id: number | string, taskData: { text: string, status: boolean }): void,
  deleteTask(id: number | string): void,
}

export abstract class TasksList {
  public tasks: Task[] = [
    // { id: 1, text: 'Js one love', status: false, order: 213 }
  ];
  public filter = FiltersValues.All;

  abstract getTasks(): Promise<Task[]>;
  abstract createTask(text: string): void;
  abstract editTask(id: number | string, taskData: { text: string, status: boolean }): void;
  abstract deleteTask(id: number | string): void;

  setFilter(filter: FiltersValues): void {
    if (
      filter === FiltersValues.All ||
      filter === FiltersValues.InCompleted ||
      filter === FiltersValues.Completed
    ) {
      this.filter = filter;
    }
  }
}