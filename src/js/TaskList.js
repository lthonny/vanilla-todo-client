function TaskList(tasks,filter) {
  this.tasks = tasks;
  this.filter =  'All'; // Completed, In completed
}

TaskList.prototype.completeTask = function(index) { 
  this.tasks[index].completed = !this.tasks[index].completed;
}

TaskList.prototype.editTask = function(index, text) { 
  this.tasks[index].text = text;
}

TaskList.prototype.deleteTask = function(index) { 
  this.tasks.splice(index, 1);
}

TaskList.prototype.createTask = function(text) {
  const task = new Task(text, false);
  this.tasks.push(task);
}

TaskList.prototype.setFilter = function(filter) {
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








