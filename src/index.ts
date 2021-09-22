import '../src/assets/styles/style.css';
import { App } from './ts/App';
import { View } from './ts/View';

import { MemoryTaskList } from './ts/storage/memory-tasklist';
import { LocalTaskList } from './ts/storage/local-tasklist';
import { ApiTasklist } from './ts/storage/api-tasklist';
import { FirebaseTaskList } from './ts/storage/firebase-tasklist';

class FactoryTaskList {
  create(type) {
    let tasklist;

    if(type === 'api-tasklist') {
      tasklist = ApiTasklist;
    }
    else if(type === 'local-tasklist') {
      tasklist = LocalTaskList;
    }
    else if(type === 'firebase-tasklist') {
      tasklist = FirebaseTaskList;
    }
    else {
      tasklist = MemoryTaskList;
    }

    return tasklist;
  }
}

document.addEventListener('DOMContentLoaded', (): void => {
  const TaskList = new FactoryTaskList();
  const app: App = new App(TaskList.create(process.env.TASKLIST), View);
  app.render();
});