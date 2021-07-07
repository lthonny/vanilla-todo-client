export function dragAndDrop(element) {
  console.log('drag and drop');


  const list = document.getElementById('tasks-content');

  let draggingEle;
  let x = 0;
  let y = 0;

  const mouseDownHandler = function (e) {
    draggingEle = e.target;

    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${e.pageY - y}px`;
    draggingEle.style.left = `${e.pageX - x}px`;

    const draggingRect = draggingEle.getBoundingClientRect();

    if (!isDraggingStarted) {
      isDraggingStarted = true;

      placeholder = document.createElement('div');
      placeholder.classList.add('placeholder');
      draggingEle.parentNode.insertBefore(
        placeholder,
        draggingEle.nextSibling
      );

      placeholder.style.height = `${draggingRect.height}px`;
    }

    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    if (prevEle && isAbove(draggingEle, prevEle)) {
      swap(placeholder, draggingEle);
      swap(placeholder, prevEle);
      return;
    }

    if (nextEle && isAbove(nextEle, draggingEle)) {
      swap(nextEle, placeholder);
      swap(nextEle, draggingEle);
    }
  };

  const mouseUpHandler = function () {
    // Remove the position styles
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    x = null;
    y = null;
    draggingEle = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);


    placeholder && placeholder.parentNode.removeChild(placeholder);
    isDraggingStarted = false;
  };


  [].slice.call(list.querySelectorAll(element)).forEach(function (item) {
    item.addEventListener('mousedown', mouseDownHandler);
  });


  let placeholder;
  let isDraggingStarted = false;

  const isAbove = function (nodeA, nodeB) {
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
  };

  const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    nodeB.parentNode.insertBefore(nodeA, nodeB);

    parentA.insertBefore(nodeB, siblingA);
  };

}

