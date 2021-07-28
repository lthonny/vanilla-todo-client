export const createEditText = function (inputDiv, currentTask, editTask) {
  inputDiv.style.backgroundColor = '#fff';

  const childNode = inputDiv.firstChild;
  inputDiv.removeChild(childNode);

  const inputEdit = document.createElement('textarea');
  inputEdit.className = 'inputEdit';
  inputEdit.maxLength = 200;

  inputEdit.value = currentTask.text;
  inputDiv.append(inputEdit);

  inputEdit.addEventListener('focus', function (event) {
    event.target.style.background = '#dff2ef'
  });
  inputEdit.focus();

  const handleBlur = function (event) {
    event.target.style.background = ''
    inputEdit.removeEventListener('blur', handleBlur)
    inputEdit.removeEventListener('keydown', handleEnter)
    editTask(currentTask.id, this.value)
  };
  const handleEnter = function (event) {
    if (event.keyCode === 13) {
      inputEdit.removeEventListener('blur', handleBlur)
      inputEdit.removeEventListener('keydown', handleEnter)
      editTask(currentTask.id, this.value)
    }
  };

  inputEdit.addEventListener('blur', handleBlur);
  inputEdit.addEventListener('keydown', handleEnter);
}