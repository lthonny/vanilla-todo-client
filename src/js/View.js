import { dragAndDrop } from './drag-and-drop';

export function View(rootNode, handlers) {
  this.rootNode = rootNode
  this.handlers = handlers
}

View.prototype.createTaskSwitch = function (currentTask) {
  const switchTask = document.createElement('div')
  switchTask.className = 'execute'

  const checkbox = document.createElement('i')
  checkbox.className = 'fas fa-check'
  switchTask.append(checkbox)

  if (currentTask.status) checkbox.style.color = '#ffbdb3';

  return switchTask
}

View.prototype.createTaskText = function (currentTask) {
  const containerTaskText = document.createElement('div')
  containerTaskText.className = 'task-text'

  const text = document.createElement('div')
  text.className = 'text'
  const p = document.createTextNode(`${currentTask.text}`)

  if (currentTask.status) text.style.textDecoration = 'line-through'
  text.append(p)
  containerTaskText.append(text)

  return containerTaskText
}

View.prototype.createEditText = function (inputDiv, currentTask, editTask) {
  inputDiv.style.backgroundColor = '#fff'
  const childNode = inputDiv.firstChild
  inputDiv.removeChild(childNode)

  const inputEdit = document.createElement('textarea')
  inputEdit.className = 'inputEdit'
  inputEdit.maxLength = 200

  inputEdit.value = currentTask.text
  inputDiv.append(inputEdit)

  inputEdit.addEventListener('focus', function (event) {
    event.target.style.background = '#dff2ef'
  })
  inputEdit.focus()

  const handleBlur = function (event) {
    event.target.style.background = ''
    inputEdit.removeEventListener('blur', handleBlur)
    inputEdit.removeEventListener('keydown', handleEnter)
    editTask(currentTask.id, this.value)
  }
  const handleEnter = function (event) {
    if (event.keyCode === 13) {
      inputEdit.removeEventListener('blur', handleBlur)
      inputEdit.removeEventListener('keydown', handleEnter)
      editTask(currentTask.id, this.value)
    }
  }

  const handlers = [handleBlur, handleEnter]

  inputEdit.addEventListener('blur', handleBlur)
  inputEdit.addEventListener('keydown', handleEnter)
}

View.prototype.createDeleteBtn = function () {
  const btnDelete = document.createElement('div')
  btnDelete.className = 'btn-delete'

  const button = document.createElement('button')
  const icon = document.createElement('i')
  icon.className = 'fas fa-trash-alt'
  button.append(icon)
  btnDelete.append(button)
  return btnDelete
}

// View.prototype.createDate = function (currentDate) {
//   const date = document.createElement('div')
//   date.className = 'date'

//   const dateTimeText = document.createTextNode(currentDate)
//   date.append(dateTimeText)

//   return date;
// }

function clearNode(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}

View.prototype.render = function () {
  clearNode(this.rootNode)
  const tasks = this.handlers.getTasksFilter() // filtered tasks

  for (let i = 0; i < tasks.length; i++) {
    const currentTask = tasks[i]

    this.createTask(currentTask)
  }

  dragAndDrop();
}

View.prototype.createTask = function (currentTask) {
  const taskContent = document.createElement('div')
  taskContent.className = 'tasks__item'

  const switchTask = this.createTaskSwitch(currentTask)
  taskContent.append(switchTask)
  const toggleTaskState = this.handlers.toggleTaskState

  switchTask.addEventListener('click', function (event) {
    toggleTaskState(currentTask.id)
  })

  const taskInputText = this.createTaskText(currentTask)
  taskContent.append(taskInputText)

  const btnDeleteTask = this.createDeleteBtn()
  taskContent.append(btnDeleteTask)
  const deleteTask = this.handlers.deleteTask

  btnDeleteTask.addEventListener('click', function (event) {
    deleteTask(currentTask.id)
  })

  // const date = this.createDate(currentTask.date)
  // taskContent.append(date)

  const idDrop = document.createElement('div');
  const idText = document.createTextNode(`[${currentTask.order}]`);
  idDrop.append(idText);
  taskContent.append(idDrop)

  const editTask = this.handlers.editTask
  const createEditText = this.createEditText.bind(this)
  taskInputText.addEventListener('dblclick', function (event) {
    createEditText(taskInputText, currentTask, editTask)
  })

  return this.rootNode.append(taskContent)
}
