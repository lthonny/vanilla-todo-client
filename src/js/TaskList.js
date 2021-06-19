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
  const taskFilter = this.tasks.filter(task => {
    if (filter === 'All') {
      return task;
    } 
    if (filter === 'Completed') {
      return task.completed;
    } 
    if (filter === 'InCompleted') {
      return !task.completed;
    } 
  })

  console.log(taskFilter);
  return taskFilter;
}

//   taskFilter.forEach((item, index=1) => {;
//     console.log(`Task: ${++index} ${item.completed === true ? '[ X ]' : '[   ]'} text: ${item.text} \n`)
//   });
// }







