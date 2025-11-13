const express = require('express');
const router = express.Router();
const { submitAssignment } = require('../../controllers/student/assignmentController');
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/:assignmentId/submit', authenticateToken, verifyRole('student'), upload.single('file'), submitAssignment);

module.exports = router;
