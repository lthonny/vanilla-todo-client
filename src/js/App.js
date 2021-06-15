// main class of the whole application

const inputTask = document.querySelector('.text');
const btnAddTask = document.querySelector('.btn-add');


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






// ! btnAddTask.addEventListener('click', event => {
  // console.log(inputTask.value);
  // inputTask.value = '';
// })

// ! add a task via a key Enter
// inputTask.addEventListener('keydown', function(event) {
//   if (event.keyCode === 13) {
//     console.log(this.value);
//     inputTask.value = '';
//   }
// });


class App {
  constructor() {
    console.log('App init');
      // new Task('Выучить js', true),
      // new Task('Выучить Andular', false),
      // new Task('Выучить Mongo.db', true)
    this.taskList = new TaskList([]);
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







