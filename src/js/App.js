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

function contentListRemove(contentList) {
  while (contentList.firstChild) {
    contentList.firstChild.remove();
  } 
}

// function createElementWithClassName() {
//     this.taskContent = document.createElement("div")
//     this.taskContent.className = 'task-content';
//     this.contentList.append(this.taskContent);
// }


App.prototype.render = function() {

  const filtredList = this.taskList.tasks.filter(task => {
    if(this.taskList.filter === 'All') return task;
    if(this.taskList.filter === 'Completed') return task.completed;
    if (this.taskList.filter === 'InCompleted') return !task.completed;
  })

  contentListRemove(this.contentList);

  for(let i = 0; i < filtredList.length; i++) {
    const currentTask = filtredList[i];
    const currentTaskId = filtredList[i].id;

    this.taskContent = document.createElement("div")
    this.taskContent.className = 'task-content';
    this.contentList.append(this.taskContent);


    // * block checkbox 
    this.execute = document.createElement("div");
    this.execute.className = 'execute';
    this.taskContent.append(this.execute);

    this.checkbox = document.createElement("i");
    this.checkbox.className = 'fas fa-check';
    this.execute.append(this.checkbox);

    if (currentTask.completed === true) {
      this.execute.style.backgroundColor = "#ccff99";
      this.checkbox.style.color = '#FB8F8F';
    }

    const completedTaskByIndex = (function(id){
      this.taskList.completeTask(id);
      this.render();
    }).bind(this);

    this.execute.addEventListener('click', function(event) {
      completedTaskByIndex(currentTaskId);
    })


    // * block text 
    this.taskText = document.createElement("div");
    this.taskText.className = 'task-text';
    this.taskContent.append(this.taskText);

    const text = document.createElement('div');
    text.className = 'text';
    this.taskText.append(text);

    const p = document.createTextNode(currentTask.text);
    text.append(p);

    const editTask = (function(id, text) {
      this.taskList.editTask(id, text);
      this.render();
    }).bind(this);


    text.addEventListener('dblclick', function (event) {
      console.log('dblclick');
      console.log(this);

      // Remove text inside div
      this.removeChild(p);

      // Create input
      this.inputEdit = document.createElement('input');
      this.inputEdit.className = 'inputEdit';
      this.inputEditLabel = document.createElement('label');

      // Insert text of current todo into input
      this.inputEdit.value = currentTask.text;

      // Insert input into div
      this.inputEdit.append(this.inputEditLabel)
      this.append(this.inputEdit)

      // Add event listners blur, on enter
      this.inputEdit.addEventListener('focus', function(event) {
        event.target.style.background = 'pink';
      });

      this.inputEdit.addEventListener('blur', function(event) {
        event.target.style.background = '';
        editTask(currentTaskId, this.value)
      });


      // editTask(currentTaskId, currentTask.text)
    })



    // * block btn delete 
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


