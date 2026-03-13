const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/:id', usersController.handleGetUserById);
router.post('/', verifyJWT, usersController.handlePostUser);
router.patch('/:id', verifyJWT, usersController.handleUpdateUser);
router.delete('/:id', verifyJWT, usersController.handleDeleteUser);

module.exports = router;