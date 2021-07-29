export default class App {
  taskslist: any;
  view: any;

  constructor(taskslist: any, view: any) {
    console.log('App init');

    this.taskslist = taskslist;
    this.view = view;

    const allTasks: HTMLElement = document.getElementById('btn-all');
    const compTasks: HTMLElement = document.getElementById('btn-completed');
    const inCompTasks: HTMLElement = document.getElementById('btn-incompleted')

    allTasks.addEventListener('click', () => this.filterTasks('All'));
    compTasks.addEventListener('click', () => this.filterTasks('Completed'));
    inCompTasks.addEventListener('click', () => this.filterTasks('InCompleted'));


    const getState = this.getState.bind(this);
    const createTask = this.taskslist.createTask.bind(taskslist);
    const deleteTask = this.taskslist.deleteTask.bind(taskslist);
    const editTask = this.taskslist.editTask.bind(taskslist);

    const handlers: object = {
      getState,
      createTask,
      editTask,
      deleteTask
    };

    this.view.handlers = handlers;
  }

  filterTasks(filter: string): void {
    this.taskslist.setFilter(filter);
    this.view.render();
  }

  getState(): void {
    const { filter } = this.taskslist;
    return this.taskslist.getTasks()
      .then(tasks => {
        return { filter, tasks };
      })
  }

  render(): void {
    this.view.render();
  }
}

