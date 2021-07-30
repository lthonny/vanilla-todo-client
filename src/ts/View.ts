import Task from "./Task";
// import { DOMElements } from './components/index';

export default class View {
  handlers: any;

  constructor(
    public rootNode: HTMLElement
  ) {
    this.handlers = {};

    const message: HTMLInputElement = document.getElementById('message') as HTMLInputElement;
    const addBtn: HTMLButtonElement = document.querySelector('.message-add');

    const crearMessage = () => {
      this.createNewTaskAction(message.value);
      message.value = '';
    }

    addBtn.addEventListener('click', (e: any): void => crearMessage());
    message.addEventListener('keydown', (e: any): void => {
      if (e.keyCode === 13) crearMessage();
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

  createTaskSwitch(currentTask: HTMLElement): HTMLElement {
    const switchTask = document.createElement('div');
    switchTask.className = 'execute';

    const checkbox = document.createElement('i');
    checkbox.className = 'fas fa-check';
    switchTask.append(checkbox);

    if (currentTask.status === false) {
      checkbox.classList.add('circle-toggle-false');
      checkbox.classList.remove('fa-check');
    } else {
      checkbox.classList.add('circle-toggle-false');
    }

    return switchTask;
  }

  createTaskText(currentTask: HTMLElement): HTMLElement {
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

  createEditText(inputDiv: HTMLElement, currentTask: HTMLElement, editTask): void {
    inputDiv.style.backgroundColor = '#fff';

    const childNode = inputDiv.firstChild;
    inputDiv.removeChild(childNode);

    const inputEdit = document.createElement('textarea');
    inputEdit.className = 'inputEdit';
    inputEdit.maxLength = 200;

    inputEdit.value = currentTask.text;
    inputDiv.append(inputEdit);

    inputEdit.addEventListener('focus', function (e: any): void {
      e.target.style.background = '#dff2ef'
    });
    inputEdit.focus();

    const handleBlur = function (e: any) {
      e.target.style.background = ''
      inputEdit.removeEventListener('blur', handleBlur)
      inputEdit.removeEventListener('keydown', handleEnter)
      editTask(currentTask.id, this.value)
    };
    const handleEnter = function (e: any): void {
      if (e.keyCode === 13) {
        inputEdit.removeEventListener('blur', handleBlur)
        inputEdit.removeEventListener('keydown', handleEnter)
        editTask(currentTask.id, this.value)
      }
    };

    inputEdit.addEventListener('blur', handleBlur);
    inputEdit.addEventListener('keydown', handleEnter);
  }

  createDeleteBtn(): HTMLElement {
    const btnDelete = document.createElement('div')
    btnDelete.className = 'btn-delete'

    const button = document.createElement('button')
    const icon = document.createElement('i')
    icon.className = 'fas fa-trash-alt'
    button.append(icon)
    btnDelete.append(button)

    return btnDelete;
  }

  modalWindow(btnDel, currentTask) {
    const modal = document.getElementById("myModal");
    const span = document.querySelector(".close");
    const btnNo = document.querySelector('.btn-delete-no');
    const btnYes = document.querySelector('.btn-delete-yes');

    const eventDisplay = (region, display) => {
      return region.addEventListener('click', () => modal.style.display = display);
    }
    eventDisplay(btnDel, "block");
    eventDisplay(btnNo, "none");
    eventDisplay(span, "none");

    window.addEventListener('click', (e): void => {
      if (e.target === modal) modal.style.display = "none";
    })

    document.addEventListener('keydown', (e): void => {
      if (e.keyCode === 27) modal.style.display = "none";
    })

    btnYes.addEventListener('click', (e): void => {
      this.deleteTask(currentTask.id);
      console.log('id', currentTask.id)
      modal.style.display = "none";
    })
  }

  render() {
    const root = this.rootNode;
    this.handlers
      .getState()
      .then(({ filter, tasks }) => {
        while (root.lastChild) {
          root.removeChild(root.lastChild);
        }
        // console.log(filter, tasks)
        const filteredTasks = tasks.sort((a, b) => {
          return a.order - b.order;
        }).filter(task => {
          // return task;
          if (filter === 'All') return task;
          if (filter === 'Completed') return task.status;
          if (filter === 'InCompleted') return !task.status;
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


    const taskElements = document.createElement('div');
    taskElements.className = 'tasks__item active';

    taskElements.addEventListener('dragstart', (e: any) => {
      e.dataTransfer.setData('application/todo', currentTask.id);
      e.target.classList.add('selected');
    });

    taskElements.addEventListener('dragover', (e: any): void => {
      e.preventDefault();
    });

    taskElements.addEventListener('drop', (e: any): void => {
      const dragId = e.dataTransfer.getData('application/todo');
      e.dataTransfer.clearData('application/todo');

      const dropId = currentTask.id;

      const index = tasks.findIndex(el => el.id === dropId);
      const afterDropIndex = index - 1;
      const beforeDropIndex = index + 1;

      let order: number;
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

    taskElements.draggable = true;

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


    // handlers delete
    const btnDel = this.createDeleteBtn();
    taskElements.append(btnDel);
    btnDel.addEventListener('click', () => {
      this.modalWindow(btnDel, currentTask);
    })
    if (currentTask.status) {
      taskElements.style.opacity = '0.6';
    }

    return taskElements;
  }
}
