const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');
const { 
  getTeacherSubmissions, 
  gradeTeacherSubmission 
} = require('../../controllers/teacher/submissionController');

router.use(authenticateToken, verifyRole('teacher'));

router.get('/submissions', getTeacherSubmissions);
router.put('/submissions/:submissionId/grade', gradeTeacherSubmission);

module.exports = router;
