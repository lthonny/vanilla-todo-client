// import './Views';

export function View(rootNode) {
  this.rootNode = rootNode;
  this.handlers = {};
  const message = document.getElementById('message');
  const addBtn = document.querySelector('.message-add');

  const render = this.render.bind(this);

  const createNewTaskAction = function (text) {
    this.handlers.createTask(text)
      .then(function () {
        render();
      })
      .catch(function (e) {
        console.log(e);
      });
  }.bind(this);

  // add new todos
  addBtn.addEventListener('click', function () {
    createNewTaskAction(message.value);
    message.value = '';
  })
  message.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      createNewTaskAction(message.value);
      message.value = '';
    }
  })
}

// delete todos
View.prototype.deleteTask = function (id) {
  const render = this.render.bind(this);
  this.handlers.deleteTask(id)
    .then(function () {
      render();
    })
    .catch(function (e) {
      console.log('error delete: ', e);
    })
}

// toggle todos
View.prototype.toggleStatus = function (id, status) {
  const render = this.render.bind(this);
  this.handlers.editTask(id, { status })
    .then(function () {
      render();
    })
    .catch(function (e) {
      console.log('error edit status: ', e);
    })
}

// edit order
View.prototype.editOrder = function (id, order) {
  const render = this.render.bind(this);
  this.handlers.editTask(id, { order })
    .then(function () {
      render();
    })
    .catch(function (e) {
      console.log('error edit order: ', e);
    })
}

// edit todos
View.prototype.editTask = function (id, text) {
  const render = this.render.bind(this);
  this.handlers.editTask(id, { text })
    .then(function () {
      render();
    })
    .catch(function (e) {
      console.log('error edit text: ', e);
    })
}


// layout toggle
View.prototype.createTaskSwitch = function (currentTask) {
  const switchTask = document.createElement('div');
  switchTask.className = 'execute';

  const checkbox = document.createElement('i');
  checkbox.className = 'fas fa-check';
  switchTask.append(checkbox);

  const task = document.querySelectorAll('.tasks__item');

  if (currentTask.status === false) {
    checkbox.classList.add('circle-toggle-false')
    checkbox.classList.remove('fa-check')
  } else {
    checkbox.classList.add('circle-toggle-false');
  }

  return switchTask;
}

// layout messages
View.prototype.createTaskText = function (currentTask) {
  const containerTaskText = document.createElement('div')
  containerTaskText.className = 'task-text'

  const text = document.createElement('div')
  text.className = 'text'
  const p = document.createTextNode(`${currentTask.text}`)

  if (currentTask.status) {
    text.style.textDecoration = 'line-through';
    text.style.color = 'green';
  }
  text.append(p)
  containerTaskText.append(text);

  return containerTaskText;
}

// layout edit messages
View.prototype.createEditText = function (inputDiv, currentTask, editTask) {
  inputDiv.style.backgroundColor = '#fff';

  const childNode = inputDiv.firstChild;
  inputDiv.removeChild(childNode);

  const inputEdit = document.createElement('textarea');
  inputEdit.className = 'inputEdit';
  inputEdit.maxLength = 200;

  inputEdit.value = currentTask.text;
  inputDiv.append(inputEdit);

  inputEdit.addEventListener('focus', function (event) {
    event.target.style.background = '#dff2ef'
  });
  inputEdit.focus();

  const handleBlur = function (event) {
    event.target.style.background = ''
    inputEdit.removeEventListener('blur', handleBlur)
    inputEdit.removeEventListener('keydown', handleEnter)
    editTask(currentTask.id, this.value)
  };
  const handleEnter = function (event) {
    if (event.keyCode === 13) {
      inputEdit.removeEventListener('blur', handleBlur)
      inputEdit.removeEventListener('keydown', handleEnter)
      editTask(currentTask.id, this.value)
    }
  };

  inputEdit.addEventListener('blur', handleBlur);
  inputEdit.addEventListener('keydown', handleEnter);
}

// layout delete button
View.prototype.createDeleteBtn = function () {
  const btnDelete = document.createElement('div')
  btnDelete.className = 'btn-delete'

  const button = document.createElement('button')
  const icon = document.createElement('i')
  icon.className = 'fas fa-trash-alt'
  button.append(icon)
  btnDelete.append(button)
  return btnDelete
}

const modalWindow = function (btn, fnDelete, currentTask) {
  const modal = document.getElementById("myModal");
  const btnNo = document.querySelector('.btn-delete-no');
  const btnYes = document.querySelector('.btn-delete-yes');
  const span = document.getElementsByClassName("close")[0];

  btn.addEventListener('click', () => {
    modal.style.display = "block";
  })
  span.addEventListener('click', () => {
    modal.style.display = "none";
  })
  btnNo.addEventListener('click', () => {
    modal.style.display = "none";
  })
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      modal.style.display = "none";
    }
  })

  btnYes.addEventListener('click', () => {
    // console.log('yes')
    fnDelete(currentTask.id);
    modal.style.display = "none";
  })
}


// render layout
View.prototype.render = function () {
  const createTaskItem = this.createTaskItem.bind(this);
  const root = this.rootNode;
  this.handlers
    .getState()
    .then(function ({ filter, tasks }) {
      while (root.lastChild) {
        root.removeChild(root.lastChild);
      }
      const filteredTasks = tasks.sort(function (a, b) {
        return a.order - b.order;
      }).filter(function (task) {
        if (filter === 'All') return task
        if (filter === 'Completed') return task.status
        if (filter === 'InCompleted') return !task.status
      })


      const taskContainer = document.createDocumentFragment();
      for (let i = 0; i < filteredTasks.length; i++) {
        const currentTask = filteredTasks[i];
        const item = createTaskItem(currentTask, tasks);
        taskContainer.append(item);
      }

      root.append(taskContainer);
    })
    .catch(function (e) {
      console.log(e)
    });
}

// alignment components
View.prototype.createTaskItem = function (currentTask, tasks) {
  const deleteTask = this.deleteTask.bind(this);
  const toggleStatus = this.toggleStatus.bind(this);
  const editTask = this.editTask.bind(this);
  const editOrder = this.editOrder.bind(this);

  const taskElements = document.createElement('div');
  taskElements.className = 'tasks__item active';

  taskElements.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('application/todo', currentTask.id);
    event.target.classList.add('selected');
  });

  taskElements.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  taskElements.addEventListener('drop', function (event) {
    const dragId = event.dataTransfer.getData('application/todo');
    event.dataTransfer.clearData('application/todo');

    const dropId = currentTask.id;

    const index = tasks.findIndex(el => el.id === dropId);
    const afterDropIndex = index - 1;
    const beforeDropIndex = index + 1;

    let order;
    if (tasks[afterDropIndex] === undefined && tasks[beforeDropIndex] !== undefined) {
      order = tasks[index].order / 2;
    }
    if (tasks[beforeDropIndex] === undefined && tasks[afterDropIndex] !== undefined) {
      order = tasks[index].order + 1;
    }

    if (tasks[afterDropIndex] !== undefined && tasks[beforeDropIndex] !== undefined) {
      order = (tasks[afterDropIndex].order + tasks[index].order) / 2;
    }

    editOrder(dragId, order);
  });


  // dragenter
  // event.target.classList.remove('selected');
  taskElements.draggable = true;
  // taskElements.dropzone = true;

  // handlers toggle
  const switchTask = this.createTaskSwitch(currentTask);
  taskElements.append(switchTask)

  switchTask.addEventListener('click', function (event) {
    toggleStatus(currentTask.id, currentTask.status);
  })


  // handlers edit
  const taskInputText = this.createTaskText(currentTask)
  taskElements.append(taskInputText)

  const createEdit = this.createEditText;
  taskInputText.addEventListener('dblclick', function (event) {
    createEdit(taskInputText, currentTask, editTask);
  })


  // handlers delete
  const btnDeleteTask = this.createDeleteBtn()
  taskElements.append(btnDeleteTask)
  btnDeleteTask.addEventListener('click', () => {
    modalWindow(btnDeleteTask, deleteTask, currentTask);
  })
  if (currentTask.status) {
    taskElements.style.opacity = '0.6';
  }

  return taskElements;
}
