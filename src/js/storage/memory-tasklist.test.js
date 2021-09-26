//const assert = require('chai').assert;
// import assert from 'assert';
import { assert, expect } from 'chai';
import { Task } from '../Task';
import { FactoryTaskList } from '../FactoryTaskList';

const tasks = [
  { id: "wsyzsa", text: "1", status: true, order: 1 },
  { id: "xcvsyz", text: "2", status: false, order: 2 },
  { id: "wszgyz", text: "3", status: true, order: 3 }
];

describe('Memory Task List', function () {

  let taskList = null;
  let app = null;

  beforeEach(function () {
    taskList = new FactoryTaskList();
    app = taskList.create('memory');
    app.tasks = (tasks || []).map(({ id, text, status, order }) => new Task(id, text, status, order));
  });

  afterEach(function () {
    // runs after each test in this block
    taskList = null;
  });


  // Able to add item
  it('Item is added to the list', function () {
    const text = 'inspirit testing';

    const newTask = app.createTask(text).then(()=>{});

    const qqz = app.tasks.filter((task) => task.text === text);

    // assert.deepEqual(app.tasks, qqz);
  })


  // // able to edit Item
  it('should', function () {
    const id = 'xcvsyz';
    const data = {text: 'gabella'};

    app.editTask(id, data).then(()=> {});


    console.log('edit', app.tasks);

    assert();
  })


  // // able to delete Item
  it('able to delete Item', function () {
    const id = 'xcvsyz';
    app.deleteTask(id).then(()=>{});

    const del = app.tasks.filter((task) => task.id === id);
    assert(del.length < 1);
  })
})
