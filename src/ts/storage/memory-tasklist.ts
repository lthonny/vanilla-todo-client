import { Task } from "../Task";
import { TasksList } from './../types';

export class InMemoryTasksList extends TasksList {
    constructor() {
        super();
    }
    getTasks(): Promise<Task[]> {
        return new Promise((resolve, reject) => {
            try {
                const drawingTasks = (this.tasks || []).map(({ id, text, status, order }) => {
                    return new Task(id, text, status, order);
                })
                resolve(drawingTasks);
            } catch (err: any) {
                reject(err);
            }
        })
    }

    createTask(text: string) {
        const { tasks } = this;
        return new Promise<Task[]>((resolve, reject) => {
            try {
                const id = Math.random().toString(36).substr(2, 9);
                let order: number;
                // console.log('tasks', tasks)
                // if (tasks.length) {
                //     order = tasks.reduce((acc, curr) => {
                //         return acc > curr.order ? acc : curr.order;
                //     }, 1) + 1;
                // } else {
                //     order = 1;
                // }

                const task = new Task(id, text, false, order = 3);
                // console.log('task type', typeof task)
                // console.log('tasks type', typeof tasks)
                tasks.push(task);

                resolve(tasks);
            } catch (err: any) {
                reject(err);
            }
        })
    }

    editTask(id: number | string, taskData: { text: string, status: boolean }) {
        const { text, status } = taskData;

        return new Promise((resolve, reject) => {
            try {
                const index = this.tasks.findIndex(el => el.id === id);

                if (text !== undefined && text !== null) {
                    this.tasks[index].text = text;
                }

                if (status !== undefined && status !== null) {
                    this.tasks[index].status = !status;
                }

                resolve(this.tasks);
            } catch (err: any) {
                reject(err);
            }
        })

    }

    deleteTask(id: number | string) {
        const tasks = this.tasks;
        return new Promise<Task[]>((resolve, reject) => {
            try {
                console.log('I promise', id)
                const index = tasks.findIndex(el => el.id === id);
                tasks.splice(index, 1);

                resolve(tasks);
            } catch (err: any) {
                reject(err);
            }
        })
    }
}

