import { assert, expect } from 'chai';
import { Task } from '../Task';
import { FactoryTaskList } from '../FactoryTaskList';

const tasks = [
  { id: "wsyzsa", text: "1", status: true, order: 1 },
  { id: "xcvsyz", text: "2", status: false, order: 2 },
  { id: "wszgyz", text: "3", status: true, order: 3 }
];

describe('Memory Task List', function () {

  let taskList = new FactoryTaskList();
  let app = null;

  beforeEach(async function () {
    app = taskList.create('memory');
    app.tasks = tasks.map(({ id, text, status, order }) => new Task(id, text, status, order));
  });

  afterEach(async function () {
    app = null;
  });

  it('Item is added to the list', async function () {
    const text = 'inspirit testing';

    await app.createTask(text);
    const [addedTask] = app.tasks.filter((task) => task.text === text);

    expect(addedTask.text).to.equal(text);
  })

  it('able to edit Item', async function () {
    const id = 'xcvsyz';
    const data = { text: 'learn dependency injection Angular' };

    await app.editTask(id, data);
    const [modifiedTask] = app.tasks.filter(task => task.id === id);

    expect(modifiedTask.text).to.equal(data.text);
  })

  it('able to delete Item', async function () {
    const id = 'xcvsyz';
    await app.deleteTask(id);

    const isDeleted = !app.tasks.find((task) => task.id === id);

    expect(isDeleted).to.be.true;
  })
})
