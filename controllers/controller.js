const path = require('path');

// как лучше назвать функции?
const getAllTasks = (request, response) => {
  response.sendFile(path.normalize(__dirname + './../tasks.json'));
}

const postAddTask = (request, response) => {
  response.send('add');
}

const putEditTask = (request, response) => {
  response.send('edit');
}

const deleteTask = (request, response) => {
  response.send('delete');
}


module.exports = { getAllTasks, postAddTask, putEditTask, deleteTask };