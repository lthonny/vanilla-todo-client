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

  if (currentTask.status) checkbox.style.color = 'rgb(129, 201, 67)';

  return switchTask;
}

// layout messages
View.prototype.createTaskText = function (currentTask) {
  const containerTaskText = document.createElement('div')
  containerTaskText.className = 'task-text'

  const text = document.createElement('div')
  text.className = 'text'
  const p = document.createTextNode(`${currentTask.text}`)

  if (currentTask.status) text.style.textDecoration = 'line-through'
  text.append(p)
  containerTaskText.append(text)

  return containerTaskText
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
  const rootNode = this.rootNode;

  const taskElements = document.createElement('div');
  taskElements.className = 'tasks__item';


  taskElements.addEventListener('dragstart', function (event) {
    console.log('dragstart', currentTask)
    const orderStart = currentTask.order;
    // console.log('orderStart', orderStart)

    event.dataTransfer.setData('application/todo', currentTask.id);
    event.dataTransfer.setData('application/todo/order', currentTask.order);
  });

  taskElements.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  const editOrder = this.editOrder.bind(this);
  taskElements.addEventListener('drop', function (event) {
    console.log('drop currentTask', currentTask);
    const dragId = event.dataTransfer.getData('application/todo');
    const orderDrag = event.dataTransfer.getData('application/todo/order');

    event.dataTransfer.clearData('application/todo');
    // event.dataTransfer.clearData('application/todo/order');

    const dropId = currentTask.id;
    // console.log(currentTask.id[i])

    const dropOrder = currentTask.order;
    const beforeDrop = dropOrder;
    const afterDrop = dropOrder;

    const index = tasks.findIndex(el => el.id === dropId);
    console.log('index dropId', index - 1)


    // const last = tasks[current - 1];

    console.log('tasks', tasks)
    console.log('beforeDrop:', beforeDrop);

    let order = (orderDrag - afterDrop) / 2;
    console.log(order)

    editOrder(dragId, order);

  });

  taskElements.addEventListener('dragend', function (event) {
  });

  taskElements.draggable = true;
  taskElements.dropzone = true;

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

  btnDeleteTask.addEventListener('click', function () {
    deleteTask(currentTask.id);
  })


  const idDrop = document.createElement('div');
  const idText = document.createTextNode(`[${currentTask.order}]`);
  idDrop.append(idText);
  taskElements.append(idDrop);

  //return this.rootNode.append(taskElements);
  return taskElements;
}
