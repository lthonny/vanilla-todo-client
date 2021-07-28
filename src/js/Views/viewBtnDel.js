export const createDeleteBtn = function () {
  const btnDelete = document.createElement('div');
  btnDelete.className = 'btn-delete';

  const button = document.createElement('button');
  const icon = document.createElement('i');
  icon.className = 'fas fa-trash-alt';
  button.append(icon);
  btnDelete.append(button);

  return btnDelete;
}