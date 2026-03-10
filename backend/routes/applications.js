const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/:id', verifyJWT, applicationController.getApplicationById);
router.post('/', verifyJWT, applicationController.postApplication);

module.exports = router;