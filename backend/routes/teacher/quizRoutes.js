const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');
const {
  getTeacherQuizzes,
  createTeacherQuiz,
  deleteTeacherQuiz
} = require('../../controllers/teacher/quizController');

// Only teachers can access these routes
router.use(authenticateToken, verifyRole('teacher'));

router.get('/', getTeacherQuizzes);
router.post('/', createTeacherQuiz);
router.delete('/:id', deleteTeacherQuiz);

module.exports = router;
