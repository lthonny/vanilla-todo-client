import '../src/assets/styles/style.css';
import { App } from './js/App';
import { View } from './js/View';
// import { TaskList } from './js/memory-tasklist';
// import { TaskList } from './js/local-tasklist';
// import { TaskList } from './js/api-tasklist';
import { TaskList } from './js/firebase-tasklist';


document.addEventListener('DOMContentLoaded', function (event) {
  const rootNode = document.querySelector('.tasks__list');
  const view = new View(rootNode);
  const tasklist = new TaskList('http://localhost:3000');
  const app = new App(tasklist, view);
  app.render();
});

