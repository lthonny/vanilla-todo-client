import { Task } from '../Task';
import { generateId } from '../utils';

export function LocalTaskList() {
    this.filter = 'All';
    this.key = 'tasks';
}

LocalTaskList.prototype.setItem = function (data) {
    localStorage.setItem(this.key, JSON.stringify(data));
    return this;
};

LocalTaskList.prototype.getItem = function () {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
};

LocalTaskList.prototype.getTasks = function () {
    const getItem = this.getItem();

    return new Promise(function (resolve, reject) {
        try {
            const tasks = (getItem || []).map(function ({
                id,
                text,
                status,
                order,
            }) {
                return new Task(id, text, status, order);
            });

            resolve(tasks);
        } catch (e) {
            reject(e);
        }
    });
};

LocalTaskList.prototype.createTask = function (text) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const id = generateId();

            let order = 1;
            if (tasks.length) {
                order =
                    tasks.reduce(function (acc, curr) {
                        return acc > curr.order ? acc : curr.order;
                    }, 1) + 1;
            }

            const task = new Task(id, text, false, order);

            tasks.push(task);
            setItem(tasks);
        })
        .catch(function (e) {
            console.log(e);
        });
};

LocalTaskList.prototype.editTask = function (id, data) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const index = tasks.findIndex(function (element) {
                return element.id === id;
            });

            console.log(data);

            if (index !== -1) {
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        tasks[index][key] = value;
                    }
                });
            }

            setItem(tasks);
        })
        .catch(function (e) {
            console.log(e);
        });
};

LocalTaskList.prototype.deleteTask = function (id) {
    const setItem = this.setItem.bind(this);

    return this.getTasks()
        .then(function (tasks) {
            const arrTasks = tasks.filter(function (task) {
                return task.id !== id;
            });

            setItem(arrTasks);
        })
        .catch(function (e) {
            console.log(e);
        });
};

LocalTaskList.prototype.setFilter = function (filter) {
    if (
        filter === 'All' ||
        filter === 'Completed' ||
        filter === 'InCompleted'
    ) {
        this.filter = filter;
    }
};
