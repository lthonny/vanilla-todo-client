import {Task} from "../Task";
import {TasksList} from './../types';
import {generateId} from '../utils';

export class MemoryTaskList extends TasksList {
    private tasks: Task[] = [];

    constructor() {
        super();
    }

    async getTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async createTask(text: string): Promise<undefined> {
        const {tasks} = this;
        const id: string  = generateId();

        let order: number = 1;
        if (tasks.length) {
            order = tasks.reduce((acc, curr) => {
                return acc > curr.order ? acc : curr.order;
            }, 1) + 1;
        }
        const task = new Task(id, text, false, order);
        tasks.push(task);
        return;
    }

    async editTask(id: string, taskData: { text: string, status: boolean, order: number }): Promise<undefined> {
        const {tasks} = this;
        const index = tasks.findIndex(el => el.id === id);

        if (index > -1) {
            Object.entries(taskData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    tasks[index][key] = value;
                }
            })
        }
        return;
    }

    async deleteTask(id: string): Promise<undefined> {
        const {tasks} = this;
        const index = this.tasks.findIndex(el => el.id === id);

        if (index > -1) {
            tasks.splice(index, 1);
        }
        return;
    }
}

