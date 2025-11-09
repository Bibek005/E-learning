const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');
const { 
  getTeacherQuizzes, 
  createTeacherQuiz, 
  deleteTeacherQuiz 
} = require('../../controllers/teacher/quizController');

router.use(authenticateToken, verifyRole('teacher'));

router.get('/quizzes', getTeacherQuizzes);
router.post('/quizzes', createTeacherQuiz);
router.delete('/quizzes/:id', deleteTeacherQuiz);

module.exports = router;
