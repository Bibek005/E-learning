const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../../controllers/student/quizController');
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

router.get('/:quizId', authenticateToken, verifyRole('student'), getQuiz);
router.post('/:quizId/submit', authenticateToken, verifyRole('student'), submitQuiz);

module.exports = router;
