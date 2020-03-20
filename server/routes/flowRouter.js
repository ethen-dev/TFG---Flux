const express = require('express');
const flowController = require('./../controllers/flowController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/:boardId/:flowName')
    .post(flowController.createFlow)

router
    .route('/:flowId')
    .patch(flowController.updateFlow)
    .delete(flowController.deleteFlow)

router
    .route('/:boardId')
    .get(flowController.getAllFlows)


module.exports = router;