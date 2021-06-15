class TaskList {
  constructor(tasks) {
    this.tasks = tasks;
    this.filter =  'All'; // Completed, In completed
  }


  completeTask(index, completed) { 
    this.tasks[index].completed = completed; 
    this.render();
  }

  editTask(index, text) { 
    this.tasks[index].text = text; 
    this.render();
  }

  deleteTask(index) { 
    this.tasks.splice(index, 1);
    this.render();
  }

  
  createTask(text) {
    const task = new Task(text, false); // random boolean
    this.tasks.push(task);
    this.render();
  }

  setFilter(filter) { // передаем All, Completed, In completed
    this.filter = filter;
    this.render()
  }


  render() {

    const taskFilter = this.tasks.filter(task => {
      if (this.filter === 'All') {
        return task;
      } 
      if (this.filter === 'Completed') {
        return task.completed;
      } 
      if (this.filter === 'Incompleted') {
        return !task.completed;
      } 
    })

    taskFilter.forEach((item, index=1) => {;
      console.log(`Task: ${++index} ${item.completed === true ? '[ X ]' : '[   ]'} text: ${item.text} \n`)
    });
  }

}



