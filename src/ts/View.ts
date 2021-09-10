import { Task } from './Task';
import { IAppHandlers, FiltersValues } from './types';

export class View {

  constructor(
    public rootNode: HTMLElement,
    public handlers: IAppHandlers
  ) {

    const addBtn: HTMLButtonElement = document.querySelector('.message-add');
    const characters: HTMLElement = document.querySelector('.max-characters');

    const message: HTMLInputElement = document.getElementById('message') as HTMLInputElement;
    message.addEventListener('keyup', (event: KeyboardEvent) => {
      if (message.value.length < 200) {
        characters.innerText = `You entered characters ${message.value.length}`;
      }
      else {
        characters.innerText = `Maximum number of characters ${message.value.length}`;
      }
    })

    addBtn.addEventListener('click', (e: any): void => {
      if (message.value.length < 200) {
        this.createNewTaskAction(message.value);
        message.value = '';
        characters.innerText = `You entered characters ${message.value.length}`;
      }
    });

    message.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        if (message.value.length < 200) {
          this.createNewTaskAction(message.value);
          message.value = '';
          event.preventDefault();
        }
      }
    })
  }

  createNewTaskAction(text: string): void {
    this.handlers.createTask(text)
      .then(() => this.render())
      .catch((e: any) => e);
  }

  deleteTask(id: string | number): void {
    this.handlers.deleteTask(id)
      .then(() => this.render())
      .catch((e: any) => e);
  }

  toggleStatus(id: string | number, status: boolean): void {
    this.handlers.editTask(id, { status })
      .then(() => this.render())
      .catch((e: any) => e);
  }

  editOrder(id: string | number, order: number): void {
    this.handlers.editTask(id, { order })
      .then(() => this.render())
      .catch((e: any) => e);
  }

  editTask(id: string | number, text: string): void {
    this.handlers.editTask(id, { text })
      .then(() => this.render())
      .catch((e: any) => e);
  }

  createTaskSwitch(currentTask: any): HTMLElement {
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

  createTaskText(currentTask: any): HTMLElement {
    const containerTaskText = document.createElement('div');
    containerTaskText.className = 'task-text';

    const text = document.createElement('div');
    text.className = 'text';
    const p = document.createTextNode(`${currentTask.text}`);

    if (currentTask.status) {
      text.style.textDecoration = 'line-through';
      text.style.color = 'green';
    }
    text.append(p);
    containerTaskText.append(text);

    return containerTaskText;
  }

  createEditText(inputDiv: HTMLElement, currentTask: any, editTask: any): void {
    inputDiv.style.backgroundColor = '#fff';

    const childNode = inputDiv.firstChild;
    inputDiv.removeChild(childNode);

    const inputEdit = document.createElement('textarea');
    inputEdit.className = 'inputEdit';
    inputEdit.maxLength = 200;

    inputEdit.value = currentTask.text;
    inputDiv.append(inputEdit);

    inputEdit.addEventListener('focus', function (e: any): void {
      e.target.style.background = '#fff';
    });
    inputEdit.focus();

    const handleBlur = function (e: any) {
      e.target.style.background = '';
      editTask(currentTask.id, this.value);
    };
    const handleEnter = function (e: any): void {
      if (e.keyCode === 13) {
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

  createDeleteBtn(): HTMLElement {
    const btnDelete = document.createElement('div')
    btnDelete.className = 'btn-delete';

    const button = document.createElement('button')
    const icon = document.createElement('i')
    icon.className = 'fas fa-trash-alt';
    button.append(icon);
    btnDelete.append(button);

    return btnDelete;
  }

  modalWindow(id) {
    const modal = document.getElementById("myModal");
    const span = document.querySelector(".close");
    const btnNo = document.querySelector('.btn-delete-no');
    const btnYes = document.querySelector('.btn-delete-yes');
    modal.style.display = "block";

    [btnNo, span].forEach((el) => {
      el.addEventListener('click', () => {
        modal.style.display = "none";
      })
    })

    window.addEventListener('click', (e): void => {
      if (e.target === modal) modal.style.display = "none";
    })

    document.addEventListener('keydown', (e): void => {
      if (e.keyCode === 27) modal.style.display = "none";
    })

    btnYes.addEventListener('click', (e): void => {
      this.deleteTask(id);
      modal.style.display = "none";
    })
  }

  render() {
    const root = this.rootNode;
    this.handlers
      .getStateFilter()
      .then(({ filter, tasks }) => {
        while (root.lastChild) {
          root.removeChild(root.lastChild);
        }
        const filteredTasks = tasks.sort((a, b) => {
          return a.order - b.order;
        }).filter(task => {
          if (filter === FiltersValues.All) return task;
          if (filter === FiltersValues.Completed) return task.status;
          if (filter === FiltersValues.InCompleted) return !task.status;
        })

        const taskContainer = document.createDocumentFragment();
        for (let i = 0; i < filteredTasks.length; i++) {
          const currentTask = filteredTasks[i];
          const item = this.createTaskItem(currentTask, tasks);
          taskContainer.append(item);
        }
        root.append(taskContainer);
      })
      .catch((err: any) => err);
  }


  createTaskItem(currentTask, tasks: Task[]): HTMLElement {
    const editTask = this.editTask.bind(this);
    const editOrder = this.editOrder.bind(this);

    // create container
    const tasksListElement = document.querySelector(`.tasks__list`);
    const taskElements: any = document.createElement('li');
    taskElements.className = 'tasks__item';
    taskElements.draggable = true;


    taskElements.addEventListener(`dragstart`, (event: any) => {
      let yDrag = event.pageY;
      event.dataTransfer.setData('yDrag', yDrag);

      event.dataTransfer.setData('application/todo', currentTask.id);
      event.target.classList.add(`selected`);
      event.target.classList.add('tasks__item-pointer');
    })

    tasksListElement.addEventListener(`dragend`, (event: any) => {
      event.target.classList.remove(`selected`);
      event.target.classList.remove('tasks__item-pointer');
    });

    document.addEventListener("dragenter", (event) => {
      const dropzone = event.target as HTMLElement;
      if (dropzone.classList.contains('tasks__item')) {
        dropzone.classList.add('dropzone');
      }
    });

    document.addEventListener("dragleave", (event) => {
      const dropzone = event.target as HTMLElement;
      if (dropzone.classList.contains('tasks__item') && dropzone.classList.contains('dropzone')) {
        dropzone.classList.remove('dropzone');
      }
    });

    taskElements.addEventListener(`dragover`, (e) => e.preventDefault());

    taskElements.addEventListener('drop', function (event) {
      const yDrag = event.dataTransfer.getData('yDrag');
      event.dataTransfer.clearData('yDrag');

      const dragId = event.dataTransfer.getData('application/todo');
      event.dataTransfer.clearData('application/todo');

      let yDrop = event.pageY;

      const index = tasks.findIndex(function (el)  {
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
    switchTask.addEventListener('click', (e: any): void => {
      this.toggleStatus(currentTask.id, currentTask.status);
    })

    // handlers edit
    const taskInputText = this.createTaskText(currentTask);
    taskElements.append(taskInputText);
    taskInputText.addEventListener('dblclick', (e: any): void => {
      this.createEditText(taskInputText, currentTask, editTask);
    })
    taskInputText.addEventListener('touchstart',  (e: any): void => {
      this.createEditText(taskInputText, currentTask, editTask);
    });

    // handlers delete
    const btnDel = this.createDeleteBtn();
    taskElements.append(btnDel);
    btnDel.addEventListener('click', () => {
      this.modalWindow(currentTask.id);
    })

    return taskElements;
  }
}