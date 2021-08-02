import '../src/assets/styles/style.css';
import { App } from './ts/App';
import { View } from './ts/View';
// import { InMemoryTasksList } from './ts/storage/memory-tasklist';
import { InMemoryTasksList } from './ts/storage/local-tasklist';
// import { InMemoryTasksList } from './ts/storage/api-tasklist';
// import { InMemoryTasksList } from './ts/storage/firebase-tasklist';

document.addEventListener('DOMContentLoaded', (): void => {
  const app: App = new App(InMemoryTasksList, View);
  app.render();
});