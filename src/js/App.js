// main class of the whole application

function App() {
  console.log('App init');

  // create installs taskLict
  this.taskList = new TaskList([]);
  this.input = document.getElementById('text');
  const btn = document.querySelector('.btn-add');
  this.contentList = document.getElementById('tasks-content');




  // filter tasks
  const btnAll = document.getElementById('btn-all');
  const btnCompleted = document.getElementById('btn-completed');
  const btnInCompleted = document.getElementById('btn-incompleted');


  const createNewTask = (function(){
    this.taskList.createTask(this.input.value);
    this.render();
    this.input.value = '';
  }).bind(this);


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


  const filterTasks = (function(filter){
    this.taskList.setFilter(filter);
    this.render();
  }).bind(this);

  btnAll.addEventListener('click', function(event) {
    filterTasks('All');
  })

  btnCompleted.addEventListener('click', function(event) {
    filterTasks('Completed');
  })

  btnInCompleted.addEventListener('click', function(event) {
    filterTasks('InCompleted');
  })

}


// elementName, tagName, className
function createElementWithClassName() {
    this.taskContent = document.createElement("div")
    this.taskContent.className = 'task-content';
    this.contentList.append(this.taskContent);
}



App.prototype.render = function() {


  const filtredList = this.taskList.tasks.filter(task => {
    if(this.taskList.filter === 'All') {
      return task;
    }
    if(this.taskList.filter === 'Completed') {
      return task.completed;
    }
    if (this.taskList.filter === 'InCompleted') {
      return !task.completed;
    }
  })

  console.log(filtredList);


  while (this.contentList.firstChild) {
    this.contentList.firstChild.remove();
  } 



  for(let i = 0; i < filtredList.length; i++) {
    const currentTask = filtredList[i];
    const currentTaskId = filtredList[i].id;

    this.taskContent = document.createElement("div")
    this.taskContent.className = 'task-content';
    this.contentList.append(this.taskContent);
    if (currentTask.completed === true) {
      this.taskContent.style.borderColor = "red";
    }

    this.execute = document.createElement("div");
    this.execute.className = 'execute';
    this.taskContent.append(this.execute);

    this.checkbox = document.createElement("input");
    this.checkbox.type = 'checkbox';
    this.execute.append(this.checkbox);

    const completedTaskByIndex = (function(id){
      this.taskList.completeTask(id);
      this.render();
    }).bind(this);

    this.checkbox.addEventListener('change', function(event) {
      completedTaskByIndex(currentTaskId);
    })


    this.taskText = document.createElement("div");
    this.taskText.className = 'task-text';
    this.taskContent.append(this.taskText);

    this.text = document.createElement('div');
    this.text.className = 'text';

    this.taskText.append(this.text);
    this.p = document.createTextNode(currentTask.text);
    this.text.append(this.p);


    this.btnDelete = document.createElement("div");
    this.btnDelete.className = 'btn-delete';
    this.taskContent.append(this.btnDelete);
    this.button = document.createElement('button');
    this.btnDelete.append(this.button);


    const deleteTaskById = (function(id) {
      this.taskList.deleteTask(id);
      this.render();
    }).bind(this);

    this.btnDelete.addEventListener('click', function(event) {
      deleteTaskById(currentTaskId);
    })


    this.i = document.createElement("i");
    this.i.className = 'fas fa-trash-alt';
    this.button.append(this.i);
  }

}


