import { Task } from '../Task';

export function TaskList(baseUrl) {
    this.filter = 'All';
    this.key = 'tasks' || '[]';
}

TaskList.prototype.setItem = function (data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    return this;
}

TaskList.prototype.getItem = function () {
    return JSON.parse(localStorage.getItem(this.key));
}


TaskList.prototype.getTasks = function () {
    const tasksItem = this.getItem();
    return new Promise(function (resolve, reject) {
        try {
            const tasks = (tasksItem || []).map(function ({ id, text, status, date, order }) {
                return new Task(id, text, status, date, order);
            })
            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    })
}


TaskList.prototype.createTask = function (text) {
    const setLocalStorage = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
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
            setLocalStorage(tasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.editTask = function (id, taskData) {
    const setLocalStorage = this.setItem.bind(this);
    const { text, status } = taskData;

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

            setLocalStorage(tasks);
        })
        .catch(function (e) {
            console.log(e);
        })
}


TaskList.prototype.deleteTask = function (id) {
    const setLocalStorage = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const index = tasks.findIndex(function (element) {
                return element.id === id;
            })

            tasks.splice(index, 1);
            setLocalStorage(tasks);
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
