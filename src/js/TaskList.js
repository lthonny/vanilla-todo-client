class TaskList {
  constructor(tasks) {
    this.tasks = [
      new Task('Выучить js', false),
      new Task('Выучить Andular', true),
      new Task('Выучить Mongo.db', false)
    ];
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

  // filterSelection args
  filterTasks() { 
    
  }

  createTask(text) {
    const task = new Task(text, false);
    this.tasks.push(task);
    this.render();
  }

  getFilter(arg) {
    // console.log(this.filter)
    if (this.filter == 'All') {
      console.log()
    } 
    if (this.filter == 'Completed') {
      this.render();
    } else {
      this.render();
    }
  }

  // taskFilter() {

  // }


  render(arg) {
    this.tasks.forEach(item => {
      console.log(`[${item.completed}] ${item.text}`);
    });

    const result = this.tasks.filter(item == this.getFilter);
  }

} 



