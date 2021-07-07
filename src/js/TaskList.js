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

  // this.getTasks()[elementIndex].completed = !this.getTasks()[elementIndex].completed;

  // this.getTasks().push(this.storage.getItem())

  // console.log(' this.storage.getItem -> ', this.storage.getItem()[elementIndex].completed = completed)
  const completed = this.storage.getItem()[elementIndex].completed = !this.storage.getItem()[elementIndex].completed


  this.getTasks(completed);

  // const task = this.storage.getItem()[elementIndex].completed
  // console.log(task)
  // console.log('arr', this.storage.getItem())

  // this.createTask(completed);
  // completed.push(this.getTasks()[elementIndex].completed);
  // console.log('storage', this.storage.setItem())
  // this.storage.setItem(this.getTasks());
  // this.storage.setItem(tasks);
  // console.log(this.tasks);
}

TaskList.prototype.createTask = function (text) {
  const id = Math.random().toString(36).substr(2, 9);
  const date = new Date();

  // const completedd = this.completeTask();
  // console.log(completedd);

  const task = new Task(id, text, false, date.toLocaleString()); // create task
  const tasks = this.getTasks() || []; // проверка на пустоту массива tasks
  tasks.push(task); // push task в this.getTasks()
  this.storage.setItem(tasks); // push this.getTasks() в this.storage

  this.tasks =
    console.log(tasks)
}



// TaskList.prototype.editTask = function (id, text) {
//   const elementIndex = this.tasks.findIndex(element => {
//     return element.id === id
//   })

//   const date = new Date()

//   this.tasks[elementIndex].text = text
//   this.tasks[elementIndex].date = date.toLocaleString()

// }


// TaskList.prototype.deleteTask = function (id) {
//   const elementIndex = this.getTasks().findIndex(element => {
//     return element.id === id
//   })

//   this.getTasks().splice(elementIndex, 1)
// }


// TaskList.prototype.setFilter = function (filter) {
//   if (filter === 'All') {
//     this.filter = 'All'
//   }
//   if (filter === 'Completed') {
//     this.filter = 'Completed'
//   }
//   if (filter === 'InCompleted') {
//     this.filter = 'InCompleted'
//   }
// }
