export const modalWindow = function (btn, fnDelete, currentTask) {
  const modal = document.getElementById("myModal");
  const btnNo = document.querySelector('.btn-delete-no');
  const btnYes = document.querySelector('.btn-delete-yes');
  const span = document.getElementsByClassName("close")[0];

  btn.addEventListener('click', () => {
    modal.style.display = "block";
  })
  span.addEventListener('click', () => {
    modal.style.display = "none";
  })
  btnNo.addEventListener('click', () => {
    modal.style.display = "none";
  })
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      modal.style.display = "none";
    }
  })

  btnYes.addEventListener('click', () => {
    // console.log('yes')
    fnDelete(currentTask.id);
    modal.style.display = "none";
  })
}