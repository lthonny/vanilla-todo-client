function TaskList(tasks) {
  this.tasks = tasks; // arr tasks
  this.filter = 'All'; // Completed, In completed
}

TaskList.prototype.completeTask = function (id) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id;
  })
  this.tasks[elementIndex].completed = !this.tasks[elementIndex].completed;
}

TaskList.prototype.editTask = function (id, text) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id;
  })
  this.tasks[elementIndex].text = text;
}

TaskList.prototype.deleteTask = function (id) {
  const elementIndex = this.tasks.findIndex(element => {
    return element.id === id;
  })
  this.tasks.splice(elementIndex, 1);
}

TaskList.prototype.createTask = function (text) {
  let id = Math.random().toString(36).substr(2, 9);
  const task = new Task(text, false, id);
  this.tasks.push(task);
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

