import { Task } from '../Task';
import {generateId} from '../utils';

export function TaskList() {
    this.filter = 'All';
    this.key = 'tasks';
}

TaskList.prototype.setItem = function (data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    return this;
}

TaskList.prototype.getItem = function () {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
}


TaskList.prototype.getTasks = function () {
    const getItem = this.getItem();
    return new Promise(function (resolve, reject) {
        try {
            const tasks = (getItem || []).map(function ({ id, text, status, date, order }) { ///
                return new Task(id, text, status, date, order);
            })
            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    })
}

// consistent interface
TaskList.prototype.createTask = function (text) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const date = new Date().toLocaleString();

            let order;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            } else {
                order = 1;
            }

            const id = generateId();
            const task = new Task(id, text, date, date, order);

            tasks.push(task);
            setItem(tasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.editTask = function (id, {text, status, order}) {
    const setItem = this.setItem.bind(this);
    // const { text, status, order } = taskData;

    // console.log('taskData', taskData);

    return this.getTasks()
        .then(function (tasks) {
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

            setItem(tasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.deleteTask = function (id) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const tasksFromRemoteTask = tasks.filter(task => task.id !== id);
            setItem(tasksFromRemoteTask);
        })
        .catch(function (e) {
            console.log(e);
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
