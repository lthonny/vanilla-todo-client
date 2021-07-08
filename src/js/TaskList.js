import { Task } from './Task'

export function TaskList(tasks, storage) {
  this.tasks = tasks; // arr tasks
  this.storage = storage;
  this.filter = 'All'; // Completed, In completed
}


TaskList.prototype.getTasks = function () {
  return (this.storage.getItem() || []).map(function ({ id, text, status, date, order }) {
    return new Task(id, text, status, date, order);
  })
}


TaskList.prototype.statusTask = function (id) {
  const tasks = this.getTasks();
  const updatedTasks = tasks.map(function (task) {
    if (task.id === id) {
      task.status = !task.status
    }
    return task;
  });

  this.storage.setItem(updatedTasks);
}


TaskList.prototype.createTask = function (text) {
  const tasks = this.getTasks() || [];

  const date = new Date();
  const id = Math.random().toString(36).substr(2, 9);
  let order;
  if (tasks.length) {
    order = tasks.reduce(function (acc, curr) {
      return acc > curr.order ? acc : curr.order;
    }, 1) + 1;
  } else {
    order = 1;
  }

  const task = new Task(id, text, false, date.toLocaleString(), order);

  tasks.push(task);
  this.storage.setItem(tasks);
}


TaskList.prototype.editTask = function (id, text) {
  const tasks = this.getTasks();

  const elementIndex = tasks.findIndex(function (element) {
    return element.id === id
  })

  const date = new Date()

  tasks[elementIndex].text = text
  tasks[elementIndex].date = date.toLocaleString()

  this.storage.setItem(tasks);
}


TaskList.prototype.deleteTask = function (id) {
  const tasks = this.getTasks();

  const elementIndex = tasks.findIndex(function (element) {
    return element.id === id;
  })

  tasks.splice(elementIndex, 1);
  this.storage.setItem(tasks);
}


TaskList.prototype.setFilter = function (filter) {
  if (filter === 'All') {
    this.filter = 'All';
  }
  if (filter === 'Completed') {
    this.filter = 'Completed';
  }
  if (filter === 'InCompleted') {
    this.filter = 'InCompleted';
  }
}

