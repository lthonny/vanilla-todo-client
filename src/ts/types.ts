import { Task } from './Task';

export enum FiltersValues {
  All = 'All',
  Completed = 'Completed',
  InCompleted = 'InCompleted'
}

export interface IAppHandlers {
  getStateFilter(): Promise<{ filter: FiltersValues, tasks: Task[] }>,
  createTask(text: string): Promise<Task[]>,
  editTask(id: string, taskData: { text?: string, status?: boolean, order?: number }): Promise<Task[]>,
  deleteTask(id: string): Promise<Task[]>,
}

export abstract class TasksList {
  public filter = FiltersValues.All;

  abstract getTasks(): Promise<Task[]>;
  abstract createTask(text: string): Promise<undefined>;
  abstract editTask(id: string, taskData: { text: string, status: boolean, order: number }): Promise<undefined>;
  abstract deleteTask(id: string): Promise<undefined>;

  setFilter(filter: string): undefined {
    if (
      filter === FiltersValues.All ||
      filter === FiltersValues.InCompleted ||
      filter === FiltersValues.Completed
    ) {
      this.filter = filter;
    }
    return;
  }
}
