// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const { verifyRole } = require('../middleware/roleMiddleware');
const { getDashboardStats } = require('../controllers/adminController');

router.get('/dashboard', authenticateToken, verifyRole('admin'), getDashboardStats);

module.exports = router;
