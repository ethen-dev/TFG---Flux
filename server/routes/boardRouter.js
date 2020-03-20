const express = require('express');
const boardController = require('./../controllers/boardController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/:userId/:boardName')
    .post(boardController.createBoard)

router 
    .route('/:boardId')
    .patch(boardController.updateBoard)
    .delete(boardController.deleteBoard)

router
    .route('/:userId')
    .get(boardController.getAllBoards)


module.exports = router;