class App {
  constructor(taskslist, view) {
    console.log('App init');

    this.taskslist = taskslist;
    this.view = view;

    const buttons = document.querySelectorAll('.btn');
    const allTasks = buttons[0], compTasks = buttons[1], inCompTasks = buttons[2];

    // const getTasks = taskslist.getTasks.bind(taskslist);
    // const createTask = taskslist.createTask.bind(taskslist);
    // const editTask = taskslist.editTask.bind(taskslist);
    // const deleteTask = taskslist.deleteTask.bind(taskslist);
    // const setFilter = taskslist.setFilter.bind(taskslist);

    console.log()

    const handlers = {
      getTasks,
      createTask,
      editTask,
      deleteTask
    };
  }

  filterTasks(filter) {
    setFilter(filter);
    this.view.render();
  }

  // allTasks.addEventListener('click', function() {
  //   filterTasks('All')
  // });
  // compTasks.addEventListener('click', function() {
  //   filterTasks('Completed')
  // });
  // inCompTasks.addEventListener('click', function() {
  //   filterTasks('InCompleted')
  // });


  getState() {
    const { filter } = taskslist;
    return getTasks()
      .then(function (tasks) {
        return { filter, tasks };
      })
  };


  // const handlers = {
  //   getState,
  //   createTask,
  //   editTask,
  //   deleteTask
  // };

  // this.view.handlers = handlers;

  render() {
    this.view.render();
  }
}

exports.module = App;
