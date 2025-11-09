const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');
const { getTeacherProfile } = require('../../controllers/teacher/profileController');

router.use(authenticateToken, verifyRole('teacher'));
router.get('/profile', getTeacherProfile);

module.exports = router;
