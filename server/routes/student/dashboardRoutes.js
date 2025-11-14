const express = require('express');
const router = express.Router();
const { getDashboard } = require('../../controllers/student/dashboardController');
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

router.get('/', authenticateToken, verifyRole('student'), getDashboard);

module.exports = router;
