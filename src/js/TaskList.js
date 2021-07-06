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
  const elementIndex = this.getTasks().findIndex(element => {
    return element.id === id
  })


  this.getTasks()[elementIndex].completed = !this.getTasks()[elementIndex].completed


  this.storage.setItem(this.getTasks());



  // this.tasks =
  // console.log(this.getTasks())
  console.log('completed', this.getTasks()[elementIndex].completed);
}

// TaskList.prototype.editTask = function (id, text) {
//   const elementIndex = this.tasks.findIndex(element => {
//     return element.id === id
//   })

//   const date = new Date()

//   this.tasks[elementIndex].text = text
//   this.tasks[elementIndex].date = date.toLocaleString()

// }


TaskList.prototype.deleteTask = function (id) {
  const elementIndex = this.getTasks().findIndex(element => {
    return element.id === id
  })

  this.getTasks().splice(elementIndex, 1)
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
