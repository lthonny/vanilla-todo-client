import './index.html';
import './styles/style.css';
import { App } from './ts/App';
import { View } from './ts/View';

import { MemoryTaskList } from './ts/storage/memory-tasklist';
import { LocalTaskList } from './ts/storage/local-tasklist';
import { ApiTasklist } from './ts/storage/api-tasklist';
import { FirebaseTaskList } from './ts/storage/firebase-tasklist';

class FactoryTaskList {
    tasklist;

    constructor() {
        this.tasklist;
    }

    create(type) {
        if (this.tasklist) {
            return this.tasklist;
        }

        if (type === 'api-tasklist') {
            this.tasklist = ApiTasklist;
        } else if (type === 'local-tasklist') {
            this.tasklist = LocalTaskList;
        } else if (type === 'firebase-tasklist') {
            this.tasklist = FirebaseTaskList;
        } else {
            this.tasklist = MemoryTaskList;
        }

        return this.tasklist;
    }
}

document.addEventListener('DOMContentLoaded', (): void => {
    const TaskList = new FactoryTaskList();
    const app: App = new App(TaskList.create(process.env.TASKLIST), View);
    app.render();
});
