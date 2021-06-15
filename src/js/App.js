// main class of the whole application

// const inputTask = document.querySelector('.text');
// const btnAddTask = document.querySelector('.btn-add');


// add a task by button

// let todoList = [];

//   btnAddTask.addEventListener('click', event => {
//     let newToDo = {
//       todo: inputTask.value,
//       completed: false
//     }
//     todoList.push(newToDo);

//     console.log(todoList);
//   })

// console.log(todoList.completed)



// btnAddTask.addEventListener('click', event => {
//   console.log(inputTask.value);
//   inputTask.value = '';
// })

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

    // console.log(this.taskList)
    this.input = document.querySelector('.text');
    const btn = document.querySelector('.btn-add');

    btn.addEventListener('click', (event) => {
      console.log(this.input.value);
      this.taskList.createTask(this.input.value);
    })

    this.taskList.createTask('новая таска')
    this.taskList.createTask('таска')
  
    this.contentList = document.querySelector('.tasks-content');

  }

  // init() {
  //   console.log('App init');
  //   const taskList = new TaskList();
  //   console.log(taskList);
  // }

  render() {
    // this.taskList
    // const element = document.createElement('div');

    console.log(this.taskList.tasks)

    this.taskList.tasks.forEach((item,index) => {
      console.log(item.text);
      this.contentList.innerHTML = `
        <div>${item.text}</div>
      `
    })

    


    // if (this.taskList !== undefined ) {
    //   console.log(this.taskList);
    // }
  }
}







