export const modalWindow = function (btn, fnDelete, currentTask) {
  const modal = document.getElementById("myModal");
  const btnNo = document.querySelector('.btn-delete-no');
  const btnYes = document.querySelector('.btn-delete-yes');
  const span = document.getElementsByClassName("close")[0];

  btn.addEventListener('click', () => modal.style.display = "block");
  span.addEventListener('click', () => modal.style.display = "none");
  btnNo.addEventListener('click', () => modal.style.display = "none");
  window.addEventListener('click', (e): void => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  })

  document.addEventListener('keydown', (e): void => {
    if (e.keyCode === 27) {
      modal.style.display = "none";
    }
  })

  btnYes.addEventListener('click', (e): void => {
    console.log('gg');
    fnDelete(currentTask.id);
    modal.style.display = "none";
  })
}