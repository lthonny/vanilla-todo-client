import { Task } from '../Task';
import { generateId } from '../utils';

export function TaskList() {
    this.tasks = [];
    this.filter = 'All';
}


TaskList.prototype.getTasks = function () {
    const tasks = this.tasks;
    return new Promise(function (resolve, reject) {
        try {
            const arrTasks = (tasks || []).map(function ({ id, text, status, date, order }) {
                return new Task(id, text, status, date, order);
            })

            resolve(arrTasks)
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.createTask = function (text) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const id = generateId();
            const date = new Date().toLocaleString();

            let order;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            } else {
                order = 1;
            }

            const task = new Task(id, text, false, date, order);
            tasks.push(task);

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.editTask = function (id, {text, status, order}) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const index = tasks.findIndex(function (element) {
                return element.id === id;
            })

            if (text !== undefined && text !== null) {
                tasks[index].text = text;
            }

            if (status !== undefined && status !== null) {
                tasks[index].status = !status;
            }

            if (order !== undefined && order !== null) {
                tasks[index].order = order;
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })

}


TaskList.prototype.deleteTask = function (id) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const index = tasks.findIndex(function (element) {
                return element.id === id;
            })

            tasks.splice(index, 1);
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.setFilter = function (filter) {
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
