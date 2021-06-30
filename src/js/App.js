// main class of the whole application

function App() {
  console.log('App init');

  this.taskList = new TaskList([], updateLocal);

  // const arrLocalStorage = !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
  // console.log(arrLocalStorage)

  console.log(this.taskList)

  // !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

  this.input = document.getElementById('text');
  const btnAddTask = document.querySelector('.btn-add');
  const contentList = document.getElementById('tasks-content');

  // filter tasks
  const btnAll = document.getElementById('btn-all');
  const btnCompleted = document.getElementById('btn-completed');
  const btnInCompleted = document.getElementById('btn-incompleted')

  this.view = new View(
    contentList,
    this.taskList,
    this.switchBtn,
    this.editBtn,
    this.deleteBtn,
  );

  // const getTasks = (function () {
  //   const tasklist = this.taskList;
  //   const filter = tasklist.filter;
  //   return taskList.filter(function (task) {
  //     if (filter === 'All') return task;
  //     if (filter === 'Completed') return task.completed;
  //     if (filter === 'InCompleted') return !task.completed;
  //   })
  // }).bind(this);


  // const handlers = {
  //   getTasks,
  //   // toggleTaskState: function(){},
  //   // deleteTask: function(){},
  //   // editTask: function(){},
  //   // setFilter: function(){}
  // };


  // new View (rootNode, handlers);



  // addContentTask
  this.inputData(btnAddTask);

  // filterEventBtn
  this.eventFilterBtn(btnAll, btnCompleted, btnInCompleted);


  function updateLocal(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
  }

}



App.prototype.inputData = function (btnAdd) {
  const createNewTask = (function () {
    this.taskList.createTask(input.value);
    input.value = '';
    this.view.render();
  }).bind(this);

  const isInputEmpty = function () {
    this.input = document.getElementById('text');
    if (this.input.value) {
      createNewTask();
      this.value = '';
    }
  }

  btnAdd.addEventListener('click', function (event) {
    isInputEmpty();
    // updateLocal()
  })

  this.input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) isInputEmpty();
  });
}



App.prototype.eventFilterBtn = function (btnAll, btnCompleted, btnInCompleted) {
  const filterTasks = (function (filter) {
    this.taskList.setFilter(filter);
    this.view.render();
  }).bind(this);

  addEventBtn(btnAll, filterTasks, 'All');
  addEventBtn(btnCompleted, filterTasks, 'Completed');
  addEventBtn(btnInCompleted, filterTasks, 'InCompleted');
}

function addEventBtn(btn, filter, status) {
  btn.addEventListener('click', function (event) {
    filter(status);
  })
}


App.prototype.switchBtn = function (element, currentTaskId) {
  const completedTaskByIndex = (function (id) {
    this.taskList.completeTask(id);
    this.render();
  }).bind(this);

  element.addEventListener('click', function (event) {
    completedTaskByIndex(currentTaskId);
  })
}


App.prototype.editBtn = function (
  elementEvent,
  elementStyle,
  input,
  currentTask,
  currentTaskId) {

  const editTask = (function (id, text) {
    this.taskList.editTask(id, text);
    this.render();
  }).bind(this);

  elementEvent.addEventListener('dblclick', function (event) {
    elementStyle.style.backgroundColor = '#fff';

    elementEvent.removeChild(input);

    this.inputEdit = document.createElement('input');
    this.inputEdit.className = 'inputEdit';
    this.inputEditLabel = document.createElement('label');

    this.inputEdit.value = currentTask;

    this.inputEdit.append(this.inputEditLabel)
    this.append(this.inputEdit)

    this.inputEdit.addEventListener('focus', function (event) {
      event.target.style.background = 'pink';
      event.target.style.paddingLeft = '10px'
    });

    this.inputEdit.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) editTask(currentTaskId, this.value);
    });

    this.inputEdit.addEventListener('blur', function (event) {
      event.target.style.background = '';
      editTask(currentTaskId, this.value)
    });
  })

}


App.prototype.deleteBtn = function (element, currentTaskId) {
  const deleteTaskById = (function (id) {
    this.taskList.deleteTask(id);
    this.render();
  }).bind(this);

  element.addEventListener('click', function (event) {
    confirm('REMOVE TASK?') == true ? deleteTaskById(currentTaskId) : null;
  })
}




