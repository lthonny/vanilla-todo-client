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
    message.addEventListener('keyup',(event) => {
      if (message.value.length <= 200 && message.value.length > 0) {
        characters.innerText = `You entered characters ${message.value.length}`
      } else if (message.value.length === 200) {
        characters.innerText = `Maximum number of characters ${message.value.length}`;
      } else {
        characters.innerText = '';
      }
    })

    addBtn.addEventListener('click', () => {
      if (message.value.length <= 200 && message.value.length > 0) {
        this.createNewTaskAction(message.value);
        message.value = '';
        characters.innerText = '';
      }
    })
    message.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        if (message.value.length <= 200 && message.value.length > 0) {
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

  deleteTask(id: string): void {
    this.handlers.deleteTask(id)
      .then(() => this.render())
      .catch((e: any) => e);
  }

  edit(id, data) {
    const {text, status, order} = data;
    this.handlers.editTask(id, {text, status, order})
        .then(() => this.render())
        .catch((e: any) => e);
  }


  createTaskSwitch(currentTask: any): HTMLElement {
    const switchTask = document.createElement('div');
    switchTask.className = 'execute';

    const checkbox = document.createElement('div');
    checkbox.className = 'check-true';
    switchTask.append(checkbox);

    checkbox.classList.add('check-false');

    if (!currentTask.status) {
      checkbox.classList.remove('check-true');
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
      text.classList.add('text-false');
    }

    text.append(p);
    containerTaskText.append(text);

    return containerTaskText;
  }

  createEditText(inputDiv: HTMLElement, currentTask: any, taskElements): void {
    taskElements.draggable = false;

    const childNode = inputDiv.firstChild;
    inputDiv.removeChild(childNode);

    const inputEdit = document.createElement('textarea');
    inputEdit.className = 'inputEdit';
    inputEdit.maxLength = 200;

    inputEdit.value = currentTask.text;
    inputDiv.append(inputEdit);

    inputEdit.focus();

    inputEdit.addEventListener('blur', (e: any) => {
      e.target.style.background = '';
      this.edit(currentTask.id, {text: inputEdit.value});
    });

    inputEdit.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 13) {
        this.edit(currentTask.id,{text: inputEdit.value});
      }
    });

    inputEdit.addEventListener('touchend',  (e: any) => {
      e.target.style.background = '';
      this.edit(currentTask.id, {text: inputEdit.value});
    });
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

  modalWindow() {
    const modal = document.getElementById('myModal');
    const btnNo = document.querySelector('.btn-delete-no');
    const btnYes = document.querySelector('.btn-delete-yes');
    const span = document.querySelector('.close');

    modal.style.display = "block";

    return new Promise(function (res, rej) {
      btnYes.addEventListener('click', () => {
        modal.style.display = 'none';
        res(true);
      });
      [span, btnNo].forEach(function (el) {
        el.addEventListener('click', () => {
          modal.style.display = "none";
          rej(false);
        });
      })
      document.addEventListener('keydown', (event) => {
        if(event.keyCode === 27) {
          modal.style.display = "none";
          rej(false);
        }
      });
      window.addEventListener('click',  (event) => {
        if(event.target === modal) {
          modal.style.display = "none"
          rej(false);
        };
      });
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
    const tasksListElement = document.querySelector(`.tasks__list`);
    const taskItem: any = document.createElement('li');
    taskItem.className = 'tasks__item';
    taskItem.draggable = true;

    taskItem.addEventListener(`dragstart`, (event: any) => {
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

    taskItem.addEventListener(`dragover`, (e) => e.preventDefault());

    taskItem.addEventListener('drop', (event) => {
      const yDrag = event.dataTransfer.getData('yDrag');
      event.dataTransfer.clearData('yDrag');

      const dragId = event.dataTransfer.getData('application/todo');
      event.dataTransfer.clearData('application/todo');

      let yDrop = event.pageY;

      const index = tasks.findIndex((el) => el.id === currentTask.id);

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

      this.edit(dragId, {order: order});
    });

    // handlers toggle
    const switchTask = this.createTaskSwitch(currentTask);
    taskItem.append(switchTask);
    switchTask.addEventListener('click', (e: any): void => {
      this.edit(currentTask.id, {status: !currentTask.status});
    })

    // handlers edit
    const editedText = this.createTaskText(currentTask);
    taskItem.append(editedText);

    const handlerEdit = () => {
      return this.createEditText(editedText, currentTask, taskItem);
    }
    editedText.addEventListener('dblclick', handlerEdit);
    editedText.addEventListener('touchstart', handlerEdit);

    // handlers delete
    const btnDel = this.createDeleteBtn();
    taskItem.append(btnDel);
    btnDel.addEventListener('click',  () => {
      this.modalWindow()
          .then(() => this.deleteTask(currentTask.id))
          .catch((e) => console.log(e));
    })

    return taskItem;
  }
}
