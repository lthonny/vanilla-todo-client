import { Task } from './Task';

export function TaskList() {
    this.tasks = [
        // {id: "7wdos7ev1", text: "Angular", status: false, date: "2021-07-15T14:25:20.647Z", order: 1},
        // {id: "7wdos7ev1", text: "Express js", status: false, date: "2021-07-15T14:25:20.647Z", order: 2},
        // {id: "7wdos7ev1", text: ".NET", status: false, date: "2021-07-15T14:25:20.647Z", order: 3},
    ];
    this.filter = 'All';
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
    const { text, status } = taskData;
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