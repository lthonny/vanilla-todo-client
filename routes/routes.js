const express = require('express');
const router = express.Router();

const { getAllTasks, postAddTask, putEditTask, deleteTask } = require('../controllers/controller.js');


// view tasks
router.get('/', getAllTasks);

// add task
router.post('/tasks', postAddTask);

// edit task
router.put('/tasks/:id', putEditTask);

// delete task
router.delete('/tasks/:id', deleteTask);



module.exports = router;
