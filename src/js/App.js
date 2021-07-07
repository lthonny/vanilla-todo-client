import { TaskList } from './TaskList'
import { View } from './View'
import { Storage } from './Storage'

export function App() {
  console.log('App init')

  const storage = new Storage();
  this.taskList = new TaskList([], storage);

  const input = document.getElementById('text')
  const addTaskBtn = document.querySelector('.btn-add')

  const rootNode = document.getElementById('tasks-content')

  const btnAll = document.getElementById('btn-all')
  const btnCompleted = document.getElementById('btn-completed')
  const btnInCompleted = document.getElementById('btn-incompleted')


  const createNewTask = function () {
    this.taskList.createTask(input.value)
    input.value = ''
    view.render()
  }.bind(this);

  const isInputEmpty = function () {
    if (input.value) {
      createNewTask()
      input.value = ''
    }
  }
  addTaskBtn.addEventListener('click', function (event) { isInputEmpty() })
  input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) isInputEmpty()
  })


  const getTasksFilter = function () {
    const taskList = this.taskList;
    const { filter } = taskList;
    return taskList.getTasks().filter(function (task) {
      // return task;
      if (filter === 'All') return task
      if (filter === 'Completed') return task.completed
      if (filter === 'InCompleted') return !task.completed
    })
  }.bind(this)


  const deleteTask = function (id) {
    this.taskList.deleteTask(id)
    confirm('REMOVE TASK?') == true ? id : null
    view.render()
  }.bind(this)


  const filterTasks = function (filter) {
    this.taskList.setFilter(filter)
    view.render()
  }.bind(this)

  btnAll.addEventListener('click', function (event) {
    filterTasks('All')
  })

  btnCompleted.addEventListener('click', function (event) {
    filterTasks('Completed')
  })

  btnInCompleted.addEventListener('click', function (event) {
    filterTasks('InCompleted')
  })


  const toggleTaskState = function (id) {
    this.taskList.completeTask(id)
    view.render()
  }.bind(this)


  const editTask = function (id, text, date) {
    this.taskList.editTask(id, text, date)
    view.render()
  }.bind(this)

  const handlers = {
    getTasksFilter,
    deleteTask,
    toggleTaskState,
    editTask
  }

  const view = new View(rootNode, handlers)
  view.render()
}
