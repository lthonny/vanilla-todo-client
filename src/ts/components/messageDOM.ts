export const createTaskText = function (currentTask) {
  const containerTaskText = document.createElement('div')
  containerTaskText.className = 'task-text'

  const text = document.createElement('div')
  text.className = 'text'
  const p = document.createTextNode(`${currentTask.text}`)

  if (currentTask.status) {
    text.style.textDecoration = 'line-through';
    text.style.color = 'green';
  }
  text.append(p)
  containerTaskText.append(text);

  return containerTaskText;
}