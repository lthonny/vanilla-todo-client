import '../src/assets/styles/style.css';
import { App } from './ts/App';
import { View } from './ts/View';
// import { TaskList } from './ts/storage/memory-tasklist';
// import { TaskList } from './ts/storage/local-tasklist';
import { TaskList } from './ts/storage/api-tasklist';
// import { TaskList } from './ts/storage/firebase-tasklist';

document.addEventListener('DOMContentLoaded', (): void => {
  const app: App = new App(TaskList, View);
  app.render();
});