export function View(rootNode) {
    this.rootNode = rootNode;
    this.handlers = {};

    const render = this.render.bind(this);

    const addBtn = document.querySelector('.message-add');
    const characters = document.querySelector('.max-characters');

    const message = document.getElementById('message');
    message.addEventListener('keyup', function (event) {
        if (message.value.length <= 200 && message.value.length > 0) {
            characters.innerText = `You entered characters ${message.value.length}`
        } else if (message.value.length === 200) {
            characters.innerText = `Maximum number of characters ${message.value.length}`;
        } else {
            characters.innerText = '';
        }
    })

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
        if (message.value.length <= 200 && message.value.length > 0) {
            createNewTaskAction(message.value);
            message.value = '';
            characters.innerText = '';
        }
    })
    message.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            if (message.value.length <= 200 && message.value.length > 0) {
                createNewTaskAction(message.value);
                message.value = '';
                event.preventDefault();
            }
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
    const containerTaskText = document.createElement('div');
    containerTaskText.className = 'task-text';

    const text = document.createElement('div')
    text.className = 'text';
    const p = document.createTextNode(`${currentTask.text}`)

    if (currentTask.status) {
        text.classList.add('text-false');
    }

    text.append(p)
    containerTaskText.append(text);

    return containerTaskText;
}

// layout edit messages
View.prototype.createEditText = function (inputDiv, currentTask, editTask, taskElements) {
    inputDiv.style.backgroundColor = '#fff';

    taskElements.draggable = false;

    const childNode = inputDiv.firstChild;
    inputDiv.removeChild(childNode);

    const inputEdit = document.createElement('textarea');
    inputEdit.className = 'inputEdit';
    inputEdit.maxLength = 200;

    inputEdit.value = currentTask.text;
    inputDiv.append(inputEdit);

    inputEdit.addEventListener('focus', function (event) {
        event.target.background = '#fff';
    });

    inputEdit.focus();

    const handleBlur = function (event) {
        event.target.style.background = '';
        editTask(currentTask.id, this.value);
    };
    const handleEnter = function (event) {
        if (event.keyCode === 13) {
            editTask(currentTask.id, this.value);
        }
    };
    const handleTouch = function (event) {
        event.target.style.background = '';
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

    return new Promise(function (res, rej) {
        btnYes.addEventListener('click', function () {
            modal.style.display = 'none';
            res('YES');
        });
        [span, btnNo].forEach(function (el) {
            el.addEventListener('click', function () {
                modal.style.display = "none";
                rej('NO');
            });
        })
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                modal.style.display = "none";
                rej('NO');
            }
        });
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none"
                rej('NO');
            }
            ;
        });
    })
}


// RENDER layout
View.prototype.render = function () {
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
    const deleteTask = this.deleteTask.bind(this);
    const toggleStatus = this.toggleStatus.bind(this);
    const editTask = this.editTask.bind(this);
    const editOrder = this.editOrder.bind(this);

    const modalWindow = this.modalWindow;
    const createEdit = this.createEditText;

    const tasksListElement = document.querySelector(`.tasks__list`);
    const taskElements = document.createElement('li');
    taskElements.className = 'tasks__item';
    taskElements.draggable = true;

    taskElements.addEventListener(`dragstart`, function (event) {
        let yDrag = event.pageY;
        event.dataTransfer.setData('yDrag', yDrag);

        event.dataTransfer.setData('application/todo', currentTask.id);
        event.target.classList.add(`selected`);
        event.target.classList.add('tasks__item-pointer');
    });

    tasksListElement.addEventListener(`dragend`, function (event) {
        event.target.classList.remove(`selected`);
        event.target.classList.remove('tasks__item-pointer');
    });


    document.addEventListener("dragenter", function (event) {
        const dropzone = event.target;
        event.target.classList.contains('tasks__item') ? dropzone.classList.add('dropzone') : null;
    });

    document.addEventListener("dragleave", function (event) {
        const dropzone = event.target;

        if (dropzone.classList.contains('tasks__item') && dropzone.classList.contains('dropzone')) {
            dropzone.classList.remove('dropzone');
        }
    });

    taskElements.addEventListener(`dragover`, function (event) {
        event.preventDefault();
    });

    taskElements.addEventListener('drop', function (event) {
        const yDrag = event.dataTransfer.getData('yDrag');
        event.dataTransfer.clearData('yDrag');

        const dragId = event.dataTransfer.getData('application/todo');
        event.dataTransfer.clearData('application/todo');

        let yDrop = event.pageY;

        const index = tasks.findIndex(function (el) {
            return el.id === currentTask.id;
        });

        let order;
        if (tasks[index - 1] === undefined && tasks[index + 1] !== undefined) {
            order = tasks[index].order / 2;
        }
        if (tasks[index + 1] === undefined && tasks[index - 1] !== undefined) {
            order = tasks[index].order + 1;
        }
        if (yDrag < yDrop && tasks[index - 1] !== undefined && tasks[index + 1] !== undefined) {
            order = (tasks[index + 1].order + tasks[index].order) / 2;
        }
        if (yDrag > yDrop && tasks[index - 1] !== undefined && tasks[index + 1] !== undefined) {
            order = (tasks[index - 1].order + tasks[index].order) / 2;
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

    taskInputText.addEventListener('dblclick', function (event) {
        createEdit(taskInputText, currentTask, editTask, taskElements);
    });
    taskInputText.addEventListener('touchstart', function (event) {
        createEdit(taskInputText, currentTask, editTask);
    });


    // handlers delete
    const btnDel = this.createDeleteBtn();
    taskElements.append(btnDel);

    btnDel.addEventListener('click', function () {
        modalWindow()
            .then(function (btn) {
                if (btn === 'YES') {
                    deleteTask(currentTask.id);
                }
            })
            .catch(function (e) {
            })
    })

    return taskElements;
}
