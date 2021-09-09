import { Task } from '../Task';

export function TaskList() {
    this.tasks = [];
    this.filter = 'All';
    this.filterActive = 'red';
}


TaskList.prototype.getTasks = function () {
    const tasks = this.tasks;
    return new Promise(function (resolve, reject) {
        try {
            const drawingTasks = (tasks || []).map(function ({ id, text, status, date, order }) {
                return new Task(id, text, status, date, order);
            })
            resolve(drawingTasks)
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.createTask = function (text) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const date = new Date();

            const id = Math.random().toString(36).substr(2, 9);
            let order;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            } else {
                order = 1;
            }

            const task = new Task(id, text, false, date.toLocaleString(), order);
            tasks.push(task);

            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.editTask = function (id, taskData) {
    const { text, status, order } = taskData;
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

            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    })

}


TaskList.prototype.deleteTask = function (id) {
    const tasks = this.tasks;

    return new Promise(function (resolve, reject) {
        try {
            const elementIndex = tasks.findIndex(function (element) {
                return element.id === id;
            })

            tasks.splice(elementIndex, 1);
            resolve(tasks);
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
