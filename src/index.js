import './index.html';
import './styles/style.css';

import { App } from './js/App';
import { View } from './js/View';
import { FactoryTaskList } from './js/FactoryTaskList';

document.addEventListener('DOMContentLoaded', function (event) {
    const rootNode = document.querySelector('.tasks__list');
    const view = new View(rootNode);
    const tasklist = new FactoryTaskList();
    const app = new App(tasklist.create(process.env.TASKLIST), view);
    app.render();
});
