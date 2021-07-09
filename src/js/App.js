import { TaskList } from './TaskList'
import { View } from './View'
import { Storage } from './Storage'

export function App() {
  console.log('App init')

  const storage = new Storage();
  this.taskList = new TaskList([], storage);

  const message = document.getElementById('message')
  const addBtn = document.querySelector('.message-add')

  const rootNode = document.querySelector('.tasks__list')

  const allBtn = document.getElementById('btn-all')
  const completedBtn = document.getElementById('btn-completed')
  const inCompletedBtn = document.getElementById('btn-incompleted')


  const deleteTask = function (id) {
    this.taskList.deleteTask(id)
    confirm('REMOVE TASK?') == true ? id : null
    view.render()
  }.bind(this);



  const createNewTask = function () {
    this.taskList.createTask(message.value)
    message.value = ''
    view.render()
  }.bind(this);

  const isInputEmpty = function () {
    if (message.value) {
      createNewTask()
      message.value = ''
    }
  }
  addBtn.addEventListener('click', function (event) { isInputEmpty() })
  message.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) isInputEmpty()
  })


  const getTasksFilter = function () {
    const taskList = this.taskList;
    const { filter } = taskList;

    const sorted = taskList.getTasks().sort(function (a, b) {
      return a.order - b.order;
    });

    return sorted.filter(function (task) {
      if (filter === 'All') return task
      if (filter === 'Completed') return task.status
      if (filter === 'InCompleted') return !task.status
    })
  }.bind(this);


  const filterTasks = function (filter) {
    this.taskList.setFilter(filter)
    view.render()
  }.bind(this)

  allBtn.addEventListener('click', function () { filterTasks('All') })
  completedBtn.addEventListener('click', function () { filterTasks('Completed') })
  inCompletedBtn.addEventListener('click', function () { filterTasks('InCompleted') })


  const toggleTaskState = function (id) {
    this.taskList.statusTask(id)
    view.render()
  }.bind(this)


  const editTask = function (id, text, date) {
    this.taskList.editTask(id, text, date)
    view.render()
  }.bind(this)


  // auto grow texterea
  const texterea = document.querySelector('.texterea')
  texterea.addEventListener('keydown', function (event) {
    texterea.style.height = '5px'
    texterea.style.height = (texterea.scrollHeight) + 'px'
  })




  const handlers = {
    getTasksFilter,
    deleteTask,
    toggleTaskState,
    editTask
  }

  const view = new View(rootNode, handlers)
  view.render()
}




App.prototype.itemEdit = function (id) {

}
