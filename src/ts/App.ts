export default class App {

  constructor(
    public taskslist: any,
    public view: any,
  ) {
    console.log('App init');

    const getElemId = (id: string) => document.getElementById(id);
    const allTasks: HTMLElement = getElemId('btn-all');
    const compTasks: HTMLElement = getElemId('btn-completed');
    const inCompTasks: HTMLElement = getElemId('btn-incompleted');


    const handlerFilter = (btn, statusFilter) => {
      return btn.addEventListener('click',
        () => this.filterTasks(statusFilter));
    }

    handlerFilter(allTasks, 'All');
    handlerFilter(compTasks, 'Completed');
    handlerFilter(inCompTasks, 'InCompleted');


    const tasklist = this.taskslist;
    const createTask = tasklist.createTask.bind(taskslist);
    const deleteTask = tasklist.deleteTask.bind(taskslist);
    const editTask = tasklist.editTask.bind(taskslist);

    const getState = this.getState.bind(this);

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

