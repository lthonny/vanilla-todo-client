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

TaskList.prototype.setFilter = function(filter) { // передаем All, Completed, In completed
  this.filter = filter;
}


// TaskList.prototype.render = function() {
//   const taskFilter = this.tasks.filter(task => {
//     if (this.filter === 'All') {
//       return task;
//     } 
//     if (this.filter === 'Completed') {
//       return task.completed;
//     } 
//     if (this.filter === 'Incompleted') {
//       return !task.completed;
//     } 
//   })

//   taskFilter.forEach((item, index=1) => {;
//     console.log(`Task: ${++index} ${item.completed === true ? '[ X ]' : '[   ]'} text: ${item.text} \n`)
//   });
// }







