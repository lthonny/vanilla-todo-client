import { Task } from './Task';
import { IAppHandlers, FiltersValues } from './types';

export class View {
    constructor(public rootNode: HTMLElement, public handlers: IAppHandlers) {
        const addBtn: HTMLButtonElement =
            document.querySelector('.message-add');
        const characters: HTMLElement =
            document.querySelector('.max-characters'); // more specific type

        const message: HTMLInputElement = document.getElementById(
            'message',
        ) as HTMLInputElement;
        message.addEventListener('keyup', () => {
            if (message.value.length <= 200 && message.value.length > 0) {
                characters.innerText = `You entered characters ${message.value.length}`;
            } else if (message.value.length === 200) {
                characters.innerText = `Maximum number of characters ${message.value.length}`;
            } else {
                characters.innerText = '';
            }
        });

        addBtn.addEventListener('click', async () => {
            if (message.value.length <= 200 && message.value.length > 0) {
                await this.createNewTaskAction(message.value);
                message.value = '';
                characters.innerText = '';
            }
        });
        message.addEventListener('keydown', async (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (message.value.length <= 200 && message.value.length > 0) {
                    await this.createNewTaskAction(message.value);
                    message.value = '';
                    event.preventDefault();
                }
            }
        });
    }

    async createNewTaskAction(text: string): Promise<undefined> {
        try {
            await this.handlers.createTask(text);
            await this.render();
        } catch (e) {
            console.log(e);
        }

        return;
    }

    async deleteTask(id: string): Promise<undefined> {
        try {
            await this.handlers.deleteTask(id);
            await this.render();
        } catch (e) {
            console.log(e);
        }

        return;
    }

    async edit(id, data): Promise<undefined> {
        try {
            const { text, status, order } = data;
            await this.handlers.editTask(id, { text, status, order });
            await this.render();
        } catch (e) {
            console.log(e);
        }

        return;
    }

    createTaskSwitch(currentTask: any): HTMLElement {
        // no any!
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

    createEditText(
        inputDiv: HTMLElement,
        currentTask: any,
        taskElements,
    ): void {
        // no any! types!
        taskElements.draggable = false;

        const childNode = inputDiv.firstChild;
        inputDiv.removeChild(childNode);

        const inputEdit = document.createElement('textarea');
        inputEdit.className = 'inputEdit';
        inputEdit.maxLength = 200;

        inputEdit.value = currentTask.text;
        inputDiv.append(inputEdit);

        inputEdit.focus();

        inputEdit.addEventListener('blur', async (e: FocusEvent) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.background = '';
            await this.edit(currentTask.id, { text: inputEdit.value });
        });

        inputEdit.addEventListener('keydown', async (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                await this.edit(currentTask.id, { text: inputEdit.value });
            }
        });

        inputEdit.addEventListener('touchend', async (e: TouchEvent) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.background = '';
            await this.edit(currentTask.id, { text: inputEdit.value });
        });
    }

    createDeleteBtn(): HTMLElement {
        const btnDelete = document.createElement('div');
        btnDelete.className = 'btn-delete';

        const button = document.createElement('button');
        const icon = document.createElement('i');
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

        modal.style.display = 'block';

        return new Promise(function (res, rej) {
            // arrow functions
            btnYes.addEventListener('click', () => {
                modal.style.display = 'none';
                res(true);
            });
            [span, btnNo].forEach(function (el) {
                el.addEventListener('click', () => {
                    modal.style.display = 'none';
                    rej(false);
                });
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    modal.style.display = 'none';
                    rej(false);
                }
            });
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    rej(false);
                }
            });
        });
    }

    async render() {
        const root = this.rootNode;

        try {
            const { filter, tasks } = await this.handlers.getStateFilter();

            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }

            const filteredTasks = tasks
                .sort((a, b) => a.order - b.order)
                .filter((task) => {
                    if (filter === FiltersValues.All) {
                        return task;
                    }
                    if (filter === FiltersValues.Completed) {
                        return task.status;
                    }
                    if (filter === FiltersValues.InCompleted) {
                        return !task.status;
                    }
                });

            const taskContainer = document.createDocumentFragment();
            for (let i = 0; i < filteredTasks.length; i++) {
                const currentTask = filteredTasks[i];
                const item = this.createTaskItem(currentTask, tasks);
                taskContainer.append(item);
            }

            root.append(taskContainer);
        } catch (e) {
            console.log(e);
        }
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
        });

        tasksListElement.addEventListener(`dragend`, (event: any) => {
            event.target.classList.remove(`selected`);
            event.target.classList.remove('tasks__item-pointer');
        });

        document.addEventListener('dragenter', (event) => {
            const dropzone = event.target as HTMLElement;
            if (dropzone.classList.contains('tasks__item')) {
                dropzone.classList.add('dropzone');
            }
        });

        document.addEventListener('dragleave', (event) => {
            const dropzone = event.target as HTMLElement;
            if (
                dropzone.classList.contains('tasks__item') &&
                dropzone.classList.contains('dropzone')
            ) {
                dropzone.classList.remove('dropzone');
            }
        });

        taskItem.addEventListener(`dragover`, (e) => e.preventDefault());

        taskItem.addEventListener('drop', async (event) => {
            const yDrag = event.dataTransfer.getData('yDrag');
            event.dataTransfer.clearData('yDrag');

            const dragId = event.dataTransfer.getData('application/todo');
            event.dataTransfer.clearData('application/todo');

            let yDrop = event.pageY;

            const index = tasks.findIndex((el) => el.id === currentTask.id);

            let order;
            if (
                tasks[index - 1] === undefined &&
                tasks[index + 1] !== undefined
            ) {
                order = tasks[index].order / 2;
            }
            if (
                tasks[index + 1] === undefined &&
                tasks[index - 1] !== undefined
            ) {
                order = tasks[index].order + 1;
            }
            if (
                yDrag < yDrop &&
                tasks[index - 1] !== undefined &&
                tasks[index + 1] !== undefined
            ) {
                order = (tasks[index + 1].order + tasks[index].order) / 2;
            }
            if (
                yDrag > yDrop &&
                tasks[index - 1] !== undefined &&
                tasks[index + 1] !== undefined
            ) {
                order = (tasks[index - 1].order + tasks[index].order) / 2;
            }

            await this.edit(dragId, { order: order });
        });

        // handlers toggle
        const switchTask = this.createTaskSwitch(currentTask);
        taskItem.append(switchTask);
        switchTask.addEventListener('click', async () => {
            await this.edit(currentTask.id, { status: !currentTask.status });
        });

        // handlers edit
        const editedText = this.createTaskText(currentTask);
        taskItem.append(editedText);

        const handlerEdit = () =>
            this.createEditText(editedText, currentTask, taskItem);
        editedText.addEventListener('dblclick', handlerEdit);
        editedText.addEventListener('touchstart', handlerEdit);

        // handlers delete
        const btnDel = this.createDeleteBtn();
        taskItem.append(btnDel);
        btnDel.addEventListener('click', async () => {
            try {
                await this.modalWindow();
                await this.deleteTask(currentTask.id);
            } catch (e) {
                console.log(e);
            }
        });

        return taskItem;
    }
}
