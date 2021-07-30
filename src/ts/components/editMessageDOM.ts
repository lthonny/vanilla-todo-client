export const createEditText = function (inputDiv: HTMLElement, currentTask: HTMLElement, editTask): void {
  inputDiv.style.backgroundColor = '#fff';

  const childNode = inputDiv.firstChild;
  inputDiv.removeChild(childNode);

  const inputEdit = document.createElement('textarea');
  inputEdit.className = 'inputEdit';
  inputEdit.maxLength = 200;

  inputEdit.value = currentTask.text;
  inputDiv.append(inputEdit);

  inputEdit.addEventListener('focus', function (e: any): void {
    e.target.style.background = '#dff2ef'
  });
  inputEdit.focus();

  const handleBlur = function (e: any) {
    e.target.style.background = ''
    inputEdit.removeEventListener('blur', handleBlur)
    inputEdit.removeEventListener('keydown', handleEnter)
    editTask(currentTask.id, this.value)
  };
  const handleEnter = function (e: any): void {
    if (e.keyCode === 13) {
      inputEdit.removeEventListener('blur', handleBlur)
      inputEdit.removeEventListener('keydown', handleEnter)
      editTask(currentTask.id, this.value)
    }
  };

  inputEdit.addEventListener('blur', handleBlur);
  inputEdit.addEventListener('keydown', handleEnter);
}