export function View(rootNode) {
    this.rootNode = rootNode;
    this.handlers = {};
    const message = document.getElementById('message');
    const addBtn = document.querySelector('.message-add');

    this.messageCharacters();

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
        const max = document.querySelector('.max-characters');
        if (message.value.length < 200) {
            createNewTaskAction(message.value);
            message.value = '';
            max.innerText = `You entered characters ${message.value.length}`;
        } else if (message.value.length === 200) {
            max.innerText = `Maximum number of characters ${message.value.length}`;
        }
    })
    message.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            const max = document.querySelector('.max-characters');
            if (message.value.length < 200) {
                createNewTaskAction(message.value);
                message.value = '';
                event.preventDefault();
                max.innerText = `You entered characters ${message.value.length}`;
            } else if (message.value.length === 200) {
                max.innerText = `Maximum number of characters ${message.value.length}`;
            }
        }
    })
}

//
View.prototype.messageCharacters = function () {
    message.addEventListener('keyup', function (event) {
        const max = document.querySelector('.max-characters');
        if (message.value.length < 200) {
            max.innerText = `You entered characters ${message.value.length}`;
        } else if (message.value.length === 200) {
            max.innerText = `Maximum number of characters ${message.value.length}`;
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
    this.handlers.editTask(id, {status})
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
    this.handlers.editTask(id, {order})
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
    this.handlers.editTask(id, {text})
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

    const checkbox = document.createElement('div');
    checkbox.className = 'check-true';
    switchTask.append(checkbox);

    if (currentTask.status === false) {
        checkbox.classList.add('check-false');
        checkbox.classList.remove('check-true');
    } else {
        checkbox.classList.add('check-false');
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
        text.classList.add('text-false');
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
        event.target.style.background = '';
        inputEdit.removeEventListener('blur', handleBlur);
        inputEdit.removeEventListener('keydown', handleEnter);
        editTask(currentTask.id, this.value);
    };
    const handleEnter = function (event) {
        if (event.keyCode === 13) {
            inputEdit.removeEventListener('blur', handleBlur);
            inputEdit.removeEventListener('keydown', handleEnter);
            editTask(currentTask.id, this.value);
        }
    };
    const handleTouch = function (event) {
        inputEdit.removeEventListener('blur', handleBlur);
        inputEdit.removeEventListener('keydown', handleEnter);
        inputEdit.removeEventListener('touchend', handleTouch);
        editTask(currentTask.id, this.value);
    }

    inputEdit.addEventListener('blur', handleBlur);
    inputEdit.addEventListener('keydown', handleEnter);

    inputEdit.addEventListener('touchend', handleTouch);
}

// layout delete button
View.prototype.createDeleteBtn = function () {
    const btnDelete = document.createElement('div');
    btnDelete.className = 'btn-delete';

    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.className = 'fas fa-trash-alt';
    button.append(icon);
    btnDelete.append(button);
    return btnDelete;
}

View.prototype.modalWindow = function () {
    const modal = document.getElementById('myModal');
    const btnNo = document.querySelector('.btn-delete-no');
    const btnYes = document.querySelector('.btn-delete-yes');
    const span = document.querySelector('.close');

    modal.style.display = "block";

    [span, btnNo].forEach(function (el) {
        el.addEventListener('click', function () {
            modal.style.display = "none";
        })
    })

    window.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        if (event.keyCode === 27) {
            modal.style.display = "none";
        }
    });

    return new Promise((res, rej) => {
        btnYes.addEventListener('click', function () {
            event.preventDefault();
            modal.style.display = 'none';
            res('YES');
        });
        btnNo.addEventListener('click', () => {
            event.preventDefault();
            modal.style.display = "none";
            rej('NO');
        });
    })
}


// RENDER layout
View.prototype.render = function () {
    this.messageCharacters();

    const createTaskItem = this.createTaskItem.bind(this);
    const root = this.rootNode;
    this.handlers
        .getState()
        .then(function ({filter, tasks}) {
            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }
            const filteredTasks = tasks.sort(function (a, b) {
                return a.order - b.order;
            }).filter(function (task) {
                if (filter === 'All') {
                    return task;
                } else if (filter === 'Completed') {
                    return task.status;
                } else if (filter === 'InCompleted') {
                    return !task.status;
                }
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
    this.messageCharacters();

    const deleteTask = this.deleteTask.bind(this);
    const toggleStatus = this.toggleStatus.bind(this);
    const editTask = this.editTask.bind(this);
    const editOrder = this.editOrder.bind(this);

    const tasksListElement = document.querySelector(`.tasks__list`);
    const taskElements = document.createElement('li');
    taskElements.className = 'tasks__item';
    taskElements.draggable = true;

    taskElements.addEventListener(`dragstart`, (e) => {
        e.dataTransfer.setData('application/todo', currentTask.id);
        const element = e.target;
        element.classList.add(`selected`);
        element.classList.add('tasks__item-pointer');

    });
    tasksListElement.addEventListener(`dragend`, (e) => {
        const element = e.target;
        element.classList.remove(`selected`);

        element.classList.remove('tasks__item-pointer');
    });


    document.addEventListener("dragenter", (event) => {
        const dropzone = event.target;

        if (dropzone.classList.contains('tasks__item')) {
            dropzone.classList.add('dropzone');
        }
    });

    document.addEventListener("dragleave", (event) => {
        const dropzone = event.target;
        if (dropzone.classList.contains('tasks__item') && dropzone.classList.contains('dropzone')) {
            dropzone.classList.remove('dropzone');
        }
    });

    taskElements.addEventListener(`dragover`, (e) => e.preventDefault());

    taskElements.addEventListener('drop', (e) => {
        const dragId = e.dataTransfer.getData('application/todo');
        e.dataTransfer.clearData('application/todo');

        const dropElementId = currentTask.id;
        const index = tasks.findIndex(el => el.id === dropElementId);

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


    // handlers toggle
    const switchTask = this.createTaskSwitch(currentTask);
    taskElements.append(switchTask);

    switchTask.addEventListener('click', function (event) {
        toggleStatus(currentTask.id, currentTask.status);
    })


    // handlers edit
    const taskInputText = this.createTaskText(currentTask);
    taskElements.append(taskInputText);

    const createEdit = this.createEditText;
    taskInputText.addEventListener('dblclick', function (event) {
        // event.preventDefault();
        createEdit(taskInputText, currentTask, editTask);
    });
    taskInputText.addEventListener('touchstart', function (event) {
        // event.preventDefault();
        createEdit(taskInputText, currentTask, editTask);
    });


    // handlers delete
    const btnDel = this.createDeleteBtn();
    taskElements.append(btnDel);

    const modalWindow = this.modalWindow;
    btnDel.addEventListener('click', function () {
        modalWindow()
            .then(function (btn) {
                if (btn === 'YES') {
                    deleteTask(currentTask.id);
                }
            })
            .catch(function (e) {
                console.log(e);
            })
    })


    if (currentTask.status) {
        taskElements.style.opacity = '0.6';
    }

    return taskElements;
}
