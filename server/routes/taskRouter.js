const express = require('express');
const taskController = require('./../controllers/taskController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/:flowId/:taskName')
    .post(taskController.createTask)

router
    .route('/:taskId')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

router
    .route('/:flowId')
    .get(taskController.getAllTasks)


module.exports = router;