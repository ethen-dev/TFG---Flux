const express = require('express');
const userController = require('./../controllers/userController');

// status ok 200 --- delete ok 204 with data: null ----- error 404 with error message

const router = express.Router();

router
    .route('/username/:userId')
    .get(userController.getUsername)

router
    .route('/update/:userId')
    .patch(userController.updateUser)

router
    .route('/:email/:password')
    .get(userController.authUser)
    .delete(userController.deleteUser)

router
    .route('/:email/:password/:userName')
    .post(userController.createUser)
    
router
    .route('/:token')
    .get(userController.authToken)
    .post(userController.logOut)

module.exports = router;