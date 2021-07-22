export function App(taskslist, view) {
  console.log('App init');

  const buttons = document.querySelectorAll('.btn');
  const allTasks = buttons[0], compTasks = buttons[1], inCompTasks = buttons[2];

  // this.taskslist = taskslist;

  const getTasks = taskslist.getTasks.bind(taskslist);
  const createTask = taskslist.createTask.bind(taskslist);
  const editTask = taskslist.editTask.bind(taskslist);
  const deleteTask = taskslist.deleteTask.bind(taskslist);
  const setFilter = taskslist.setFilter.bind(taskslist);

  const filterTasks = function (filter) {
    setFilter(filter);
    this.view.render();
  }.bind(this);

  allTasks.addEventListener('click', function () {
    filterTasks('All')
  });
  compTasks.addEventListener('click', function () {
    filterTasks('Completed')
  });
  inCompTasks.addEventListener('click', function () {
    filterTasks('InCompleted')
  });


  const getState = function () {
    const { filter } = taskslist;
    return getTasks()
      .then(function (tasks) {
        return { filter, tasks };
      })
  };


  this.view = view;
  const handlers = {
    getState,
    createTask,
    editTask,
    deleteTask
  };

  this.view.handlers = handlers;
}

App.prototype.render = function () {
  this.view.render();
}