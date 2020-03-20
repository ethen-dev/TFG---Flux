const express = require('express');
const userController = require('./../controllers/userController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/:email/:password')
    .post(userController.createUser)
    .get(userController.authUser)
    
router
    .route('/:token')
    .get(userController.authToken)

module.exports = router;