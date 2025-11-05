const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const {
  createCourse,
  getTeacherCourses,
  updateCourse,
  deleteCourse,
  getAllCourses,
} = require('../controllers/courseController');

// 🧑‍🏫 Teacher routes
router.post('/', auth, role('teacher'), createCourse);
router.get('/teacher', auth, role('teacher'), getTeacherCourses);
router.put('/:id', auth, role('teacher'), updateCourse);
router.delete('/:id', auth, role('teacher'), deleteCourse);

// 🎓 Public route for students to view available courses
router.get('/', getAllCourses);

module.exports = router;
