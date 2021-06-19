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


  // const deleteTaskByIndex = (function(i){
  //   this.taskList.deleteTask(i);
  //   this.render();
  // }).bind(this);

  const isInputEmpty = function() {
    this.input = document.getElementById('text');
    if(this.input.value == ''){
      alert('TASK IS EMPTY!!!');
    } else {
      createNewTask();
      this.value = '';
      
    }
  }

  btn.addEventListener('click', function(event) {
    isInputEmpty();
  })

  this.input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      isInputEmpty();
    }
  });

}


// elementName, tagName, className
function createElementWithClassName() {
    // this.taskContent = document.createElement("div")
    // this.taskContent.className = 'task-content';
    // this.contentList.append(this.taskContent);
//   console.log(this.elementName = document.createElement(tagName));
//   console.log(this.elementName.className = className);
//   return this.elementName
}


App.prototype.render = function() {

  console.log(this.taskList.tasks);

  while (this.contentList.firstChild) {
    this.contentList.firstChild.remove();
  } 

  for(let i = 0; i < this.taskList.tasks.length; i++) {

    createElementWithClassName();

    this.taskContent = document.createElement("div")
    this.taskContent.className = 'task-content';
    this.contentList.append(this.taskContent);

    this.execute = document.createElement("div");
    this.execute.className = 'execute';
    this.taskContent.append(this.execute);

    this.checkbox = document.createElement("input");
    this.checkbox.type = 'checkbox';
    this.execute.append(this.checkbox);

    const completedTaskByIndex = (function(i){
      this.taskList.completeTask(i);
      this.render();
    }).bind(this);

    this.checkbox.addEventListener('change', function(event) {
      // console.log('checkbox', i);
      // if (this.taskList)
      completedTaskByIndex(i)
      // console.log(this.taskList)
    })

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


    const deleteTaskByIndex = (function(i){
      this.taskList.deleteTask(i);
      this.render();
    }).bind(this);
        
    this.btnDelete.addEventListener('click', function(event) {
      deleteTaskByIndex(i);
    })


    this.i = document.createElement("i");
    this.i.className = 'fas fa-trash-alt';
    this.button.append(this.i);
  }

}

