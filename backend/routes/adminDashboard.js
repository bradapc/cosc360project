const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/adminDashboardController');

router.post('/', adminDashboardController.handleAdmin);

module.exports = router;