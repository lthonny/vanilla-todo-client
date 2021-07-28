import { Task } from '../Task';

export function TaskList() {
    this.tasks = [];
    this.filter = 'All';
}


TaskList.prototype.getTasks = function () {
    const tasks = this.tasks;
    return new Promise(function (resolve, reject) {
        try {
            const drawingTasks = (tasks || []).map(function ({ id, text, status, order }) {
                return new Task(id, text, status, order);
            })
            resolve(drawingTasks)
        } catch (err: any) {
            reject(err);
        }
    })
}


TaskList.prototype.createTask = function (text: String) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const id: any = Math.random().toString(36).substr(2, 9);
            let order: any;
            if (tasks.length) {
                order = tasks.reduce(function (acc: any, curr: any) {
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


TaskList.prototype.editTask = function (id: Number, taskData: any) {
    const { text, status } = taskData;
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const index = tasks.findIndex(function (element: any) {
                return element.id === id;
            })

            if (text !== undefined && text !== null) {
                tasks[index].text = text;
            }

            if (status !== undefined && status !== null) {
                tasks[index].status = !status;
            }

            resolve(tasks);
        } catch (err: any) {
            reject(err);
        }
    })

}


TaskList.prototype.deleteTask = function (id: Number) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const elementIndex = tasks.findIndex(function (element: any) {
                return element.id === id;
            })

            tasks.splice(elementIndex, 1);

            resolve(tasks);
        } catch (err: any) {
            reject(err);
        }
    })
}


TaskList.prototype.setFilter = function (filter: String) {
    if (filter === 'All') {
        this.filter = 'All';
    }
    if (filter === 'Completed') {
        this.filter = 'Completed';
    }
    if (filter === 'InCompleted') {
        this.filter = 'InCompleted';
    }
}