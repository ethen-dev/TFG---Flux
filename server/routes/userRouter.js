const express = require('express');
const userController = require('./../controllers/userController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/username/:userId')
    .get(userController.getUsername)

router
    .route('/:email/:password')
    .post(userController.createUser)
    .get(userController.authUser)
    .delete(userController.deleteUser)
    
router
    .route('/:token')
    .get(userController.authToken)
    .post(userController.logOut)

module.exports = router;