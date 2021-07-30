import Task from '../Task';

enum FiltersValues {
    'All',
    'Completed',
    'InCompleted'
}

export default class TaskList {
    tasks: Array<Task> = [];
    filter: FiltersValues = FiltersValues.All;

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
        const tasks = this.tasks;
        return new Promise<Task[]>((resolve, reject) => {
            try {
                const id = Math.random().toString(36).substr(2, 9);
                let order: number;
                console.log('tasks', tasks)
                if (tasks.length) {
                    order = tasks.reduce((acc, curr) => {
                        return acc > curr.order ? acc : curr.order;
                    }, 1) + 1;
                } else {
                    order = 1;
                }

                const task = new Task(id, text, false, order);
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

    setFilter(filter: string): void {
        if (filter === 'All') {
            this.filter = FiltersValues.All;
        }
        if (filter === 'Completed') {
            this.filter = FiltersValues.Completed;
        }
        if (filter === 'InCompleted') {
            this.filter = FiltersValues.InCompleted;
        }
    }
}
