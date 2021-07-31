import { Task } from './Task';
import { FiltersValues, TasksList, IAppHandlers } from './types';
import { View } from './View';

export class App {
  private taskList: TasksList;
  private view: View;
  constructor(
    protected taskslistConstructor: new () => TasksList,
    protected viewConstructor: new (rootNode: HTMLElement, handlers: IAppHandlers) => View
  ) {
    this.taskList = new taskslistConstructor();
    const rootNode: HTMLElement = document.querySelector('.tasks__list');

    const getElemId = (id: string) => document.getElementById(id);
    const allTasks: HTMLButtonElement = getElemId('btn-all') as HTMLButtonElement;
    const compTasks: HTMLButtonElement = getElemId('btn-completed') as HTMLButtonElement;
    const inCompTasks: HTMLButtonElement = getElemId('btn-incompleted') as HTMLButtonElement;

    const handlerFilter = (btn: HTMLButtonElement, statusFilter: FiltersValues) => {
      return btn.addEventListener('click',
        () => this.filterTasks(statusFilter));
    }

    handlerFilter(allTasks, FiltersValues.All);
    handlerFilter(compTasks, FiltersValues.Completed);
    handlerFilter(inCompTasks, FiltersValues.InCompleted);

    const createTask = this.taskList.createTask.bind(this.taskList);
    const deleteTask = this.taskList.deleteTask.bind(this.taskList);
    const editTask = this.taskList.editTask.bind(this.taskList);

    const getStateFilter: any = this.getStateFilter.bind(this);

    const handlers: IAppHandlers = {
      getStateFilter,
      createTask,
      editTask,
      deleteTask
    };

    this.view = new viewConstructor(rootNode, handlers);
  }

  filterTasks(filter: FiltersValues): void {
    this.taskList.setFilter(filter);
    this.render();
  }

  getStateFilter(): Promise<{ filter: FiltersValues, tasks: Task[] }> {
    const { filter } = this.taskList;
    return this.taskList.getTasks()
      .then(tasks => {
        return { filter, tasks };
      })
  }

  render(): void {
    this.view.render();
  }
}




