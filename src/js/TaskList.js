import { Task } from './Task'

export function TaskList(tasks, storage) {
  this.tasks = tasks; // arr tasks
  this.storage = storage;
  this.filter = 'All'; // Completed, In completed
}


TaskList.prototype.getTasks = function () {
  return (this.storage.getItem() || []).map(function ({ id, text, completed, date }) {
    return new Task(id, text, completed, date);
  })
}


TaskList.prototype.completeTask = function (id) {
  const tasks = this.getTasks();
  const updatedTasks = tasks.map(function (task) {
    if (task.id === id) {
      task.completed = !task.completed
    }
    return task;
  });

  this.storage.setItem(updatedTasks);
}



TaskList.prototype.editTask = function (id, text) {
  const tasks = this.getTasks();

  const elementIndex = tasks.findIndex(element => {
    return element.id === id
  })

  const date = new Date()

  tasks[elementIndex].text = text
  tasks[elementIndex].date = date.toLocaleString()

  this.storage.setItem(tasks);
}


TaskList.prototype.deleteTask = function (id) {
  const tasks = this.getTasks();

  const elementIndex = tasks.findIndex(element => {
    return element.id === id
  })

  tasks.splice(elementIndex, 1);
  this.storage.setItem(tasks);
}


TaskList.prototype.createTask = function (text) {
  const id = Math.random().toString(36).substr(2, 9);
  const date = new Date();
  const task = new Task(id, text, false, date.toLocaleString());
  const tasks = this.getTasks() || [];
  tasks.push(task);
  this.storage.setItem(tasks);

  this.tasks =
    console.log(tasks)
}

TaskList.prototype.setFilter = function (filter) {
  if (filter === 'All') {
    this.filter = 'All'
  }
  if (filter === 'Completed') {
    this.filter = 'Completed'
  }
  if (filter === 'InCompleted') {
    this.filter = 'InCompleted'
  }
}
