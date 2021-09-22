import {Task} from './Task';
import {FiltersValues, TasksList, IAppHandlers} from './types';
import {View} from './View';

export class App {
    private view: View;
    private taskList: TasksList;

    constructor(
        public taskslistConstructor: new () => TasksList,
        public viewConstructor: new (rootNode: HTMLElement, handlers: IAppHandlers) => View
    ) {
        this.taskList = new taskslistConstructor();
        const rootNode: HTMLElement = document.querySelector('.tasks__list');

        const allTasks: HTMLButtonElement = document.querySelector('.btn-all') as HTMLButtonElement;
        const compTasks: HTMLButtonElement = document.querySelector('.btn-completed') as HTMLButtonElement;
        const inCompTasks: HTMLButtonElement = document.querySelector('.incompleted') as HTMLButtonElement;

        allTasks.addEventListener('click', () => this.filterTasks(FiltersValues.All));
        compTasks.addEventListener('click', () => this.filterTasks(FiltersValues.Completed));
        inCompTasks.addEventListener('click', () => this.filterTasks(FiltersValues.InCompleted));

        const menuItems = document.getElementsByClassName('btn');
        allTasks.classList.add('activeBtn');
        const onClick = (e: any) => {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('activeBtn');
            }
            e.currentTarget.classList.add('activeBtn');
        };

        for (let i = 0; i < menuItems.length; i++) {
            menuItems[i].addEventListener('click', onClick, false);
        }

        const createTask = this.taskList.createTask.bind(this.taskList);
        const deleteTask = this.taskList.deleteTask.bind(this.taskList);
        const editTask = this.taskList.editTask.bind(this.taskList);

        const getStateFilter = this.getStateFilter.bind(this);

        const handlers: IAppHandlers = {
            getStateFilter,
            createTask,
            editTask,
            deleteTask
        };

        this.view = new viewConstructor(rootNode, handlers);
    }

    filterTasks(filter: FiltersValues): void {
        this.taskList.setFilter(filter);
        this.render();
    }

    async getStateFilter(): Promise<{ filter: FiltersValues, tasks: Task[] }> {
        const {filter} = this.taskList;
        const tasks = await this.taskList.getTasks();
        return {filter, tasks};
    }

    render(): void {
        this.view.render();
    }
}




