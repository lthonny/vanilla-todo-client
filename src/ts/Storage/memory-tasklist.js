import { Task } from '../Task';

class TaskList {
    constructor() {
        this.tasks = [];
        this.filter = 'All';
    }

    getTasks() {
        const tasks = this.tasks;
        return new Promise(function (resolve, reject) {
            try {
                const drawingTasks = (tasks || []).map(({ id, text, status, order }) => {
                    return new Task(id, text, status, order);
                })
                resolve(drawingTasks)
            } catch (err) {
                reject(err);
            }
        })
    }

    createTask(text) {
        const tasks = this.tasks;
        return new Promise(function (resolve, reject) {
            try {
                const id = Math.random().toString(36).substr(2, 9);
                let order;
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
            } catch (err) {
                reject(err);
            }
        })
    }

    editTask(id, taskData) {
        const tasks = this.tasks;
        const { text, status } = taskData;

        return new Promise(function (resolve, reject) {
            try {
                const index = tasks.findIndex((element) => {
                    return element.id === id;
                })

                if (text !== undefined && text !== null) {
                    tasks[index].text = text;
                }

                if (status !== undefined && status !== null) {
                    tasks[index].status = !status;
                }

                resolve(tasks);
            } catch (err) {
                reject(err);
            }
        })

    }

    deleteTask(id) {
        const tasks = this.tasks;
        return new Promise(function (resolve, reject) {
            try {
                const elementIndex = tasks.findIndex((element) => {
                    return element.id === id;
                })

                tasks.splice(elementIndex, 1);

                resolve(tasks);
            } catch (err) {
                reject(err);
            }
        })
    }

    setFilter(filter) {
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
}

exports.module = TaskList;