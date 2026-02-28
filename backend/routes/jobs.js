const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

const verifyJWT = require('../middleware/verifyJWT');

router.get('/', jobsController.handleGetJobs);
router.post('/', verifyJWT, jobsController.handlePostJob);

module.exports = router;