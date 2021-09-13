import { Task } from "../Task";
import { TasksList } from './../types';

export class TaskList extends TasksList {
    key: any;
    constructor() {
        super();
        this.key = 'tasks';
    }

    setItem(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
        return this;
    }

    getItem() {
        return JSON.parse(localStorage.getItem(this.key));
    }

    getTasks(): Promise<Task[]> {
        const tasksItem = this.getItem();
        return new Promise((resolve, reject) => {
            try {
                const tasks = (tasksItem || []).map(({ id, text, status, order }) => {
                    return new Task(id, text, status, order);
                })
                resolve(tasks);
            } catch (err: any) {
                reject(err);
            }
        })
    }

    createTask(text: string) {
        const setLocalStorage = this.setItem.bind(this);

        return this.getTasks()
            .then(tasks => {
                const id = Math.random().toString(36).substr(2, 9);
                let order: number;
                if (tasks.length) {
                    order = tasks.reduce((acc, curr) => {
                        return acc > curr.order ? acc : curr.order;
                    }, 1) + 1;
                } else {
                    order = 1;
                }

                const task = new Task(id, text, false, order);

                tasks.push(task);
                setLocalStorage(tasks);
            })
            .catch((err: any) => console.log(err));
    }

    editTask(id: number | string, taskData: { text: string, status: boolean, order: number }) {
        const { text, status, order } = taskData;

        return this.getTasks()
            .then(tasks => {

                const index = tasks.findIndex(el => el.id === id);

                if (text !== undefined && text !== null) {
                    tasks[index].text = text;
                }

                if (status !== undefined && status !== null) {
                    tasks[index].status = !status;
                }

                if (order !== undefined && order !== null) {
                    tasks[index].order = order;
                }

                this.setItem(tasks);
            })
            .catch((err: any) => console.log(err));
    }

    deleteTask(id: number | string) {
        return this.getTasks()
            .then(tasks => {
                const tasksFromRemoteTask = tasks.filter(task => task.id !== id);
                this.setItem(tasksFromRemoteTask);
            })
            .catch((err: any) => console.log(err));
    }
}

