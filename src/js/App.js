// main class of the whole application

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
    const btnRemove = document.createElement('div');
    // btnRemove.className = 'btn-delete';
    // console.log(btnRemove);

    // console.log(this.input.value)

    btn.addEventListener('click', (event) => {
      console.log('1',this);
      this.taskList.createTask(this.input.value);
      this.input.value = '';
      this.render()
    })

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
    // btnRemove.addEventListener('click', (event) => {
    //   deleteTask(slice)
    //   console.log('asda')
    // })



    this.contentList = document.querySelector('.tasks-content');
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
    const element = document.createElement('div');
    element.className = 'containerList';
    element.innerHTML = '';

    // btn remove

    for(let i = 0; i < this.taskList.tasks.length; i++) {
      const container = document.createElement("div");
      const task = document.createElement("div");
      const taskContent = document.createElement("div");
      const execute = document.createElement("div");
      const checkbox = document.createElement("input");
      const taskText = document.createElement("div");
      const text = document.createElement("input");
      const btnDelete = document.createElement("div");
      const fas =  document.createElement("div");

      this.contentList.append(element);
      element.insertAdjacentHTML('beforebegin', container)

      // element.innerHTML = `
      //   <div class="container">
      //     <div class="task">
      //       <div class="task-content">
      //         <div class="execute">
      //           <input type="checkbox">
      //         </div>
      //         <div class="task-text">
      //           <div class="text">${this.taskList.tasks[i].text}</div>
      //         </div>
      //         <div class="btn-delete">
      //           <button><i class="fas fa-trash-alt"></i></button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // `
      // this.contentList.append(element)
    }


    // if (this.taskList !== undefined ) {
    //   console.log(this.taskList);
    // }
  }
}



