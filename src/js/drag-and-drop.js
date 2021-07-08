export function dragAndDrop() {
  const tasksListElement = document.querySelector(`.tasks__list`);
  const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

  // iterating over the elements
  for (const task of taskElements) {
    task.draggable = true;
  }

  tasksListElement.addEventListener(`dragstart`, function (event) {
    event.target.classList.add(`selected`);
  })

  tasksListElement.addEventListener(`dragend`, function (event) {
    event.target.classList.remove(`selected`);
  });



  tasksListElement.addEventListener(`dragover`, function (event) {
    // allow to drop
    event.preventDefault();

    // find the element to be moved
    const activeElement = tasksListElement.querySelector(`.selected`);

    // we find the element over which the cursor is currently located
    const currentElement = event.target;

    // check that the event was triggered:
    // 1. not on the element we are moving,
    // 2. exactly on the list item
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains(`tasks__item`);

    // interrupt the function
    if (!isMoveable) {
      return;
    }

    // find the element before which we will insert
    let nextElement;
    if (currentElement === activeElement.nextElementSibling) {
      nextElement = currentElement.nextElementSibling
    } else {
      nextElement = currentElement
    }

    // insert activeElement before nextElement
    tasksListElement.insertBefore(activeElement, nextElement);
  });
}



const getNextElement = function (cursorPosition, currentElement) {
  // get an object with dimensions and coordinates
  const currentElementCoord = currentElement.getBoundingClientRect();
  // vertical center coordinate
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // true - the cursor is above the center of the element, return the current element
  // false - next DOM element
  let nextElement;
  if (cursorPosition < currentElementCenter) {
    nextElement = currentElement;
  } else {
    nextElement = currentElement.nextElementSibling;
  }

  return nextElement;
};



// tasksListElement.addEventListener(`dragover`, function (event) {
//   event.preventDefault();

//   const activeElement = tasksListElement.querySelector(`.selected`);
//   const currentElement = event.target;
//   const isMoveable = activeElement !== currentElement &&
//     currentElement.classList.contains(`tasks__item`);

//   if (!isMoveable) {
//     return;
//   }

//   // the vertical coordinate of the cursor when the event was fired
//   const nextElement = getNextElement(event.clientY, currentElement);

//   // check do i need to swap elements ?
//   if (
//     nextElement &&
//     activeElement === nextElement.previousElementSibling ||
//     activeElement === nextElement
//   ) {
//     // if not, exit the function to avoid unnecessary changes to the DOM
//     return;
//   }

//   tasksListElement.insertBefore(activeElement, nextElement);
// });


