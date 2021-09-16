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
            const tasks = (getItem || []).map(function ({ id, text, status, order }) {
                return new Task(id, text, status, order);
            })

            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.createTask = function (text) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const id = generateId();

            let order = 1;
            if (tasks.length) {
                order = tasks.reduce(function (acc, curr) {
                    return acc > curr.order ? acc : curr.order;
                }, 1) + 1;
            }

            const task = new Task(id, text, false, order);

            tasks.push(task);
            setItem(tasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.editTask = function (id, data) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
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
            const arrTasks = tasks.filter(function(task) {
                return task.id !== id;
            });

            setItem(arrTasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.setFilter = function (filter) {
    if(
        filter === 'All' ||
        filter === 'Completed' ||
        filter === 'InCompleted'
    ) {
        this.filter = filter;
    }
}


