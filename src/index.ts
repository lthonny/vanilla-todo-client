import '../src/assets/styles/style.css';
import App from './ts/App';
import View from './ts/View';
import TaskList from './ts/Storage/memory-tasklist';
// import { TaskList } from './ts/Storage/local-tasklist';
// import { TaskList } from './ts/Storage/api-tasklist';
// import { TaskList } from './ts/Storage/firebase-tasklist';


document.addEventListener('DOMContentLoaded', (event): void => {
  const rootNode: HTMLElement = document.querySelector('.tasks__list');
  const view = new View(rootNode);
  const tasklist: object = new TaskList();
  // console.log('tasklist', tasklist)
  // const tasklist = new TaskList('http://localhost:3000');
  const app = new App(tasklist, view);
  app.render();
});

