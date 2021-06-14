class TaskList {
  constructor(tasks) {
    this.tasks = [
      new Task('Выучить js', false),
      new Task('Выучить Andular', true),
      new Task('Выучить Mongo.db', false)
    ];
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
    // console.log(this.tasks[1].completed);
    const inCompleted = [];
    const completed = [];
    const all = [];

    const filterTasks = this.tasks.filter(item => {
      // console.log(item.completed == false ? 'X' : '-')
      if (item.completed == false && item.completed == true) {
        all.push(`${`text: ${item.text}, completed: ${item.completed}`}`);
        console.log(all);
      } 
      if (item.completed == true && item.completed != false) {
        completed.push(`${`text: ${item.text}, completed: ${item.completed }`}`);
        console.log(completed);
      } 
      if (item.completed == false && item.completed != true) {
        inCompleted.push(`${`text: ${item.text}, completed: ${item.completed }`}`);
        console.log(inCompleted);
      }
    })
    // console.log(all);
    
  }

  createTask(text) {
    const task = new Task(text, false);
    this.tasks.push(task);
    this.render();
  }

  render() {
    this.tasks.forEach(item => {
      console.log(`[${item.completed}] ${item.text}`);
    });
    
  }

} 



