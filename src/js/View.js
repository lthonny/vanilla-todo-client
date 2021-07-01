function View(rootNode, handlers) {
  this.rootNode = rootNode;
  this.handlers = handlers;
}

View.prototype.createTaskSwitch = function (currentTask) {
  const switchTask = document.createElement("div");
  switchTask.className = 'execute';

  const checkbox = document.createElement("i");
  checkbox.className = 'fas fa-check';
  switchTask.append(checkbox);

  if (currentTask.completed) {
    switchTask.style.backgroundColor = "#ffbdb3";
    checkbox.style.color = '#ec4f43';
  }

  return switchTask;
}


View.prototype.createTaskText = function (currentTask) {
  const containerTaskText = document.createElement("div");
  containerTaskText.className = 'task-text';

  const text = document.createElement('div');
  text.className = 'text';
  const p = document.createTextNode(currentTask.text);

  if (currentTask.completed) text.style.textDecoration = "line-through";
  text.append(p);
  containerTaskText.append(text);
  return containerTaskText;
}

View.prototype.createEditText = function (inputDiv, currentTask, editTask) {
  inputDiv.style.backgroundColor = '#fff';
  const childNode = inputDiv.firstChild;
  inputDiv.removeChild(childNode);

  const inputEdit = document.createElement('input');
  inputEdit.className = 'inputEdit';

  //const inputEditLabel = document.createElement('label');

  inputEdit.value = currentTask.text;

  // inputEdit.append(inputEditLabel);
  inputDiv.append(inputEdit);

  inputEdit.addEventListener('focus', function (event) {
    event.target.style.background = 'pink';
    event.target.style.paddingLeft = '10px';
  });


  const handleBlur = function (event) {
    console.log('blur')
    event.target.style.background = '';
    inputEdit.removeEventListener('blur', handleBlur);
    inputEdit.removeEventListener('keydown', handleEnter);
    editTask(currentTask.id, this.value);
  }
  const handleEnter = function (event) {
    if (event.keyCode === 13) {
      //this.blur();
      inputEdit.removeEventListener('blur', handleBlur);
      inputEdit.removeEventListener('keydown', handleEnter);
      editTask(currentTask.id, this.value);
    }
  }

  const handlers = [handleBlur, handleEnter];


  inputEdit.addEventListener('blur', handleBlur);
  inputEdit.addEventListener('keydown', handleEnter);

}


View.prototype.createDeleteBtn = function () {
  const btnDelete = document.createElement("div");
  btnDelete.className = 'btn-delete';

  const button = document.createElement('button');
  const icon = document.createElement("i");
  icon.className = 'fas fa-trash-alt';
  button.append(icon);
  btnDelete.append(button);
  return btnDelete;
}

function clearNode(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}


View.prototype.render = function () {

  console.log(this.rootNode);
  clearNode(this.rootNode);
  const tasks = this.handlers.getTasks(); // filtered tasks

  for (let i = 0; i < tasks.length; i++) {
    const currentTask = tasks[i];

    this.createTask(currentTask);
  }

}

View.prototype.createTask = function (currentTask) {

  const taskContent = document.createElement("div")
  taskContent.className = 'task-content';

  const switchTask = this.createTaskSwitch(currentTask);
  taskContent.append(switchTask);
  const toggleTaskState = this.handlers.toggleTaskState;

  switchTask.addEventListener('click', function (event) {
    toggleTaskState(currentTask.id);
  });

  const taskInputText = this.createTaskText(currentTask);
  taskContent.append(taskInputText);

  const btnDeleteTask = this.createDeleteBtn();
  taskContent.append(btnDeleteTask);
  const deleteTask = this.handlers.deleteTask;

  btnDeleteTask.addEventListener('click', function (event) {
    deleteTask(currentTask.id);
  })

  const editTask = this.handlers.editTask;
  const createEditText = this.createEditText.bind(this);
  taskInputText.addEventListener('dblclick', function (event) {
    console.log('taskInputText', taskInputText)
    createEditText(taskInputText, currentTask, editTask);
  })

  return this.rootNode.append(taskContent);
}
