// function View(rootNode, handlers){
//   this.rootNode = rootNode;
//   this.handlers = handlers;
// }

function View(contentList, taskList, switchBtn, editBtn, deleteBtn, saveLocalTodos) {
  this.taskList = taskList;
  this.contentList = contentList;

  // console.log(this.taskList)

  this.switchBtn = switchBtn;
  this.editBtn = editBtn;
  this.deleteBtn = deleteBtn;


  this.saveLocalTodos = saveLocalTodos;
}



View.prototype.createTaskSwitch = function () {
  const switchTask = document.createElement("div");
  switchTask.className = 'execute';

  this.checkbox = document.createElement("i");
  this.checkbox.className = 'fas fa-check';

  return switchTask;
}


View.prototype.createTaskText = function () {
  const containerTaskText = document.createElement("div");
  containerTaskText.className = 'task-text';

  this.text = document.createElement('div');
  this.text.className = 'text';

  return containerTaskText;
}


View.prototype.createDeleteBtn = function () {
  const btnDelete = document.createElement("div");
  btnDelete.className = 'btn-delete';

  this.button = document.createElement('button');

  this.icon = document.createElement("i");
  this.icon.className = 'fas fa-trash-alt';

  return btnDelete;
}



// function createTasksCounter(length) {
//   this.quantityTasks = document.getElementById('quantityTasks');
//   this.quantityTasks.innerHTML = `<h2 id = "quantityTasks"> Daily tasks total: ${length}</h2>`;
// }


function clearElement(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

View.prototype.render = function () {
  const tasks = this.handlers.getTasks(); // filtered tasks

}

View.prototype.render = function () {
  clearElement(this.contentList);

  const arrLocalStorage = !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
  // const local = this.saveLocalTodos(this.taskList.tasks);

  console.log('local collection', arrLocalStorage)


  this.taskList.tasks = []

  arrLocalStorage.forEach(item => {
    return this.taskList.tasks.push(item)
  })

  console.log('taskList', this.taskList)


  const filtredList = this.taskList.tasks.filter(task => {
    if (this.taskList.filter === 'All') return task;
    if (this.taskList.filter === 'Completed') return task.completed;
    if (this.taskList.filter === 'InCompleted') return !task.completed;
  })

  for (let i = 0; i < filtredList.length; i++) {
    const currentTask = filtredList[i];
    const currentTaskId = filtredList[i].id;

    this.createTask(
      currentTask.text,
      currentTask
    )

    this.deleteBtn(this.btnDeleteTask, currentTaskId);

    this.editBtn(
      this.text,
      this.taskInputText,
      this.p,
      currentTask.text,
      currentTaskId);

    this.switchBtn(this.switchTask, currentTaskId);

  }

}

View.prototype.createTask = function (input, currentTask) {

  const taskContent = document.createElement("div")
  taskContent.className = 'task-content';

  this.switchTask = this.createTaskSwitch();
  this.switchTask.append(this.checkbox);
  taskContent.append(this.switchTask);

  if (currentTask.completed) {
    this.switchTask.style.backgroundColor = "#ffbdb3";
    this.checkbox.style.color = '#ec4f43';
  }


  this.taskInputText = this.createTaskText();
  this.taskInputText.append(this.text);
  this.p = document.createTextNode(input);
  this.text.append(this.p);
  taskContent.append(this.taskInputText);

  if (currentTask.completed) {
    this.text.style.textDecoration = "line-through"
  }


  this.btnDeleteTask = this.createDeleteBtn();
  this.btnDeleteTask.append(this.button);
  this.button.append(this.icon);
  taskContent.append(this.btnDeleteTask);

  return this.contentList.append(taskContent);
}





