const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

const verifyJWT = require('../middleware/verifyJWT');

router.get('/', jobsController.handleGetJobs);
router.get('/:id', jobsController.handleGetJobById);
router.post('/', verifyJWT, jobsController.handlePostJob);
router.patch('/:id', verifyJWT, jobsController.handleUpdateJob);
router.delete('/:id', verifyJWT, jobsController.handleDeleteJob);

module.exports = router;