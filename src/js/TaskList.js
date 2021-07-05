import { Task } from './Task'

export function TaskList(tasks, storage) {
  this.tasks = tasks; // arr tasks
  this.storage = storage;
  this.filter = 'All'; // Completed, In completed
}

TaskList.prototype.getTasks = function () {
  return this.tasks;
}

TaskList.prototype.completeTask = function (id) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id
  })
  this.tasks[elementIndex].completed = !this.tasks[elementIndex].completed

}

TaskList.prototype.editTask = function (id, text) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id
  })

  const date = new Date()

  this.tasks[elementIndex].text = text
  this.tasks[elementIndex].date = date.toLocaleString()

}

TaskList.prototype.deleteTask = function (id) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id
  })
  this.tasks.splice(elementIndex, 1)

}

TaskList.prototype.createTask = function (text) {
  const id = Math.random().toString(36).substr(2, 9)
  const date = new Date()
  const task = new Task(text, false, id, date.toLocaleString())
  this.tasks.push(task)

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
