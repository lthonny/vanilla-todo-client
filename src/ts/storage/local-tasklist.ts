import {Task} from "../Task";
import {TasksList} from './../types';
import {generateId} from '../utils';

export class LocalTaskList extends TasksList {
    private readonly key: string = 'tasks';

    constructor() {
        super();
    }

    private setItem(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
        return this;
    }

    private getItem() {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    async getTasks(): Promise<Task[]> {
        return this.getItem().map(
            ({id, text, status, order}) => new Task(id, text, status, order)
        );
    }

    async createTask(text: string): Promise<undefined> {
        const tasks = await this.getTasks();
        const id: string = generateId();

        let order: number = 1;
        if (tasks.length) {
            order = tasks.reduce((acc, curr) => {
                return acc > curr.order ? acc : curr.order;
            }, 1) + 1;
        }

        const task = new Task(id, text, false, order);
        tasks.push(task);
        this.setItem(tasks);

        return;
    }

    async editTask(
        id: string,
        taskData: { text?: string, status?: boolean, order?: number }
    ): Promise<undefined> {
        const tasks = await this.getTasks();
        const index = tasks.findIndex(el => el.id === id);

        if (index > -1) {
            Object.entries(taskData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    tasks[index][key] = value;
                }
            })
        }

        this.setItem(tasks);
        return;
    }

    async deleteTask(id: string): Promise<undefined> {
        const tasks = await this.getTasks();
        const newTasks = tasks.filter(task => task.id !== id);
        this.setItem(newTasks);

        return;
    }
}

