const express = require('express');
const router = express.Router();

// Auth & Role middlewares
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

// Controllers
const dashboardController = require('../../controllers/teacher/dashboardController');

// Routes
router.use('/courses', require('./courseRoutes'));
router.use('/assignments', require('./assignmentRoutes'));
router.use('/quizzes', require('./quizRoutes'));
router.use('/materials', require('./materialRoutes'));
router.use('/students', require('./studentRoutes'));
router.use('/submissions', require('./submissionRoutes'));
router.use('/profile', require('./profileRoutes'));

// router.use('/quizzes', require('./quizRoutes')); // ✅ this must exist!


// Teacher dashboard route
router.get(
  '/dashboard',
  authenticateToken,
  verifyRole('teacher'),
  dashboardController.getTeacherDashboard
);

module.exports = router;
