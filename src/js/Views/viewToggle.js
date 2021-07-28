export const createTaskSwitch = function (currentTask) {
  const switchTask = document.createElement('div');
  switchTask.className = 'execute';

  const checkbox = document.createElement('i');
  checkbox.className = 'fas fa-check';
  switchTask.append(checkbox);

  const task = document.querySelectorAll('.tasks__item');

  if (currentTask.status === false) {
    checkbox.classList.add('circle-toggle-false')
    checkbox.classList.remove('fa-check')
  } else {
    checkbox.classList.add('circle-toggle-false');
  }

  return switchTask;
}