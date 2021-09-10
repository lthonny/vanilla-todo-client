import { Task } from './Task';

export enum FiltersValues {
  All = 'All',
  Completed = 'Completed',
  InCompleted = 'InCompleted'
}

export interface IAppHandlers {
  getStateFilter(): Promise<{ filter: FiltersValues, tasks: Task[] }>,
  createTask(text: string): Promise<Task[]>,
  editTask(id: number | string, taskData: { text?: string, status?: boolean, order?: number }): Promise<Task[]>,
  deleteTask(id: number | string): Promise<Task[]>,
}

export abstract class TasksList {
  public tasks: Task[] = [];
  public filter = FiltersValues.All;

  abstract getTasks(): Promise<Task[]>;
  abstract createTask(text: string): void;
  abstract editTask(id: number | string, taskData: { text: string, status: boolean, order: number }): void;
  abstract deleteTask(id: number | string): void;

  setFilter(filter: string): void {
    if (
      filter === FiltersValues.All ||
      filter === FiltersValues.InCompleted ||
      filter === FiltersValues.Completed
    ) {
      this.filter = filter;
    }
  }
}