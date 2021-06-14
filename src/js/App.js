// main class of the whole application

class App {
  constructor() {
    console.log('App init');
    this.taskList = new TaskList();
  }

  // init() {
  //   console.log('App init');
  //   const taskList = new TaskList();
  //   console.log(taskList);
  // }

  render() {
    if (this.taskList !== undefined ) {
      console.log(this.taskList);
    }

  }
}










