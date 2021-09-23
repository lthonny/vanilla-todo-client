import '../src/assets/styles/style.css';

import { App } from './js/App';
import { View } from './js/View';

import { MemoryTaskList } from './js/storage/memory-tasklist';
import { LocalTaskList } from './js/storage/local-tasklist';
import { ApiTasklist } from './js/storage/api-tasklist';
import { FirebaseTaskList } from './js/storage/firebase-tasklist';

function FactoryTaskList() {
    this.tasklist;
}

FactoryTaskList.prototype.create = function (type) {
    if (this.tasklist) {
        return this.tasklist;
    }

    if (type === 'api-tasklist') {
        this.tasklist = new ApiTasklist();
    } else if (type === 'local-tasklist') {
        this.tasklist = new LocalTaskList();
    } else if (type === 'firebase-tasklist') {
        this.tasklist = new FirebaseTaskList();
        console.log('fb');
    } else {
        this.tasklist = new MemoryTaskList();
    }

    return this.tasklist;
};

document.addEventListener('DOMContentLoaded', function (event) {
    const rootNode = document.querySelector('.tasks__list');
    const view = new View(rootNode);
    const tasklist = new FactoryTaskList();
    const app = new App(tasklist.create(process.env.TASKLIST), view);
    app.render();
});
