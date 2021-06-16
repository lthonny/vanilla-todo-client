// main class of the whole application

// ! add a task via a key Enter
// inputTask.addEventListener('keydown', function(event) {
//   if (event.keyCode === 13) {
//     console.log(this.value);
//     inputTask.value = '';
//   }
// });


class App {
  // text = '';
  constructor() {
    console.log('App init');

      // crate instalse tasklict
    this.taskList = new TaskList([]);

    this.input = document.querySelector('.text');
    const btn = document.querySelector('.btn-add');

    console.log(this.taskList)
    btn.addEventListener('click', (event) => {
      // console.log('1',this);
      this.taskList.createTask(this.input.value);
      // this.input.value = '';
      this.render()
    })
    // console.log(this.input.value)

    // console.log(createTask);
    this.input.addEventListener('keydown', function (event) {
      // console.log('2',this);
      // if (event.keyCode === 13) {
      //   this.taskList.createTask(this.value); 
      //   // console.log(this.value);
      //   this.value = '';
      //   this.render()
      // }
    }); 

    // bind()

    // remove
    // console.log(this.btnDelete);


  // this.btnDelete.addEventListener('click', (event) => {
    
  //   })

  }

  creationStructure() {
    
  }
  
  displayMessages() {
    this.taskList((element, text) => {
      console.log(text)
    })
    console.log(this.taskList)  
  }

  // init() {
  //   console.log('App init');
  //   const taskList = new TaskList();
  //   console.log(taskList);
  // }

  render() {
    // this.taskList
    
    console.log(this.taskList)

    // btn remove

    // this.text = this.taskList.tasks
    for(let i = 0; i < this.taskList.tasks.length; i++) {

      this.contentList = document.querySelector('.tasks-content');

      this.container = document.createElement("div");
      this.container.className = 'container';
      this.contentList.append(this.container);

      this.task = document.createElement("div");
      this.task.className = 'task';
      this.container.append(this.task);

      this.taskContent = document.createElement("div");
      this.taskContent.className = 'task-content';
      this.task.append(this.taskContent);

      this.execute = document.createElement("div");
      this.execute.className = 'execute';
      this.taskContent.append(this.execute);

      this.checkbox = document.createElement("input");
      this.checkbox.type = 'checkbox';
      this.execute.append(this.checkbox);

      this.taskText = document.createElement("div");
      this.taskText.className = 'task-text';
      this.taskContent.append(this.taskText);
      this.taskList.tasks;
      this.text = document.createElement("div");
      this.text.className = 'text';
      this.taskText.append(this.text);

      this.p = document.createTextNode(this.input.value);
      this.text.append(this.p);

      this.btnDelete = document.createElement("div");
      this.btnDelete.className = 'btn-delete';
      this.taskContent.append(this.btnDelete);

      // this.btnDelete.addEventListener('click', (event) => {
      //   console.log(this.taskList.deleteTask);
      // })

      this.button = document.createElement("button");
      this.btnDelete.append(this.button);

      this.i = document.createElement("i");
      this.i.className = 'fas fa-trash-alt';
      this.button.append(this.i);

      this.contentList.append(element);
    }

     console.log(i);


    // if (this.taskList !== undefined ) {
    //   console.log(this.taskList);
    // }

  }
}



