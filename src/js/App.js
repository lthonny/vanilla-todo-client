// main class of the whole application

function App() {
  console.log('App init');

  // create installs taskLict
  this.taskList = new TaskList([]);
  this.input = document.getElementById('text');


  const btn = document.querySelector('.btn-add');
  this.contentList = document.getElementById('tasks-content');


  const createNewTask = (function(){
    this.taskList.createTask(this.input.value);
    this.render();
    this.input.value = '';
  }).bind(this);

  btn.addEventListener('click', function(event) {
    createNewTask();
  })

  this.input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      createNewTask();
      this.value = '';
    }
  });
}


function createElementWithClassName(tagName, className) {
  this.element = document.createElement(tagName)
  this.element.className = className;
  return this.element;
}



App.prototype.render = function() {

  while (this.contentList.firstChild) {
    this.contentList.firstChild.remove();
  } 


    for(let i = 0; i < this.taskList.tasks.length; i++) {

      createElementWithClassName('div', 'task-content');

      console.log(this.element);

      this.taskContent = document.createElement("div")
      this.taskContent.className = 'task-content';
      this.contentList.append(this.taskContent);

      this.execute = document.createElement("div");
      this.execute.className = 'execute';
      this.taskContent.append(this.execute);

      this.checkbox = document.createElement("input");
      this.checkbox.type = 'checkbox';
      this.execute.append(this.checkbox);

      this.taskText = document.createElement("div");
      this.taskText.className = 'task-text';
      this.taskContent.append(this.taskText);

      this.text = document.createElement('div');
      this.text.className = 'text';
      this.taskText.append(this.text);

      this.p = document.createTextNode(this.taskList.tasks[i].text);
      this.text.append(this.p);

      this.btnDelete = document.createElement("div");
      this.btnDelete.className = 'btn-delete';
      this.taskContent.append(this.btnDelete);

      this.button = document.createElement('button');
      this.btnDelete.append(this.button);


      this.btnDelete.addEventListener('click', function(event) {
        // this.taskList.deleteTask(i);
        // console.log(this.taskList);
      })

      this.i = document.createElement("i");
      this.i.className = 'fas fa-trash-alt';
      this.button.append(this.i);
    }


}




















// function App(params) {
//   this.test = ''
// }

// App.prototype.createStructure = function(params) {
//   console.log('createSructure work');  
// }

// const app = new App();
// app.createStructure();






