import {Task} from '../Task';
import {generateId} from '../utils';

export function TaskList() {
    this.tasks = [];
    this.filter = 'All';
}


TaskList.prototype.getTasks = function () {
    const {tasks} = this;

    return new Promise(function (resolve, reject) {
        try {
            const arrTasks = (tasks || []).map(function ({id, text, status, order}) {
                return new Task(id, text, status, order);
            })

            resolve(arrTasks)
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.createTask = function (text) {
    const {tasks} = this;

    return new Promise(function (resolve, reject) {
        try {
            const id = generateId();

            let order = 1;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            }

            const task = new Task(id, text, false, order);
            tasks.push(task);

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.editTask = function (id, data) {
    const {tasks} = this;

    return new Promise(function (resolve, reject) {
        try {
            const index = tasks.findIndex(function (element) {
                return element.id === id;
            })

            if (index !== -1) {
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        tasks[index][key] = value;
                    }
                })
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })

}


TaskList.prototype.deleteTask = function (id) {
    const {tasks} = this;

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
