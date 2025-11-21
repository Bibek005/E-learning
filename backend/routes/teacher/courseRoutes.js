
// server/routes/teacher/courseRoutes.js
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/authMiddleware');
const role = require('../../middleware/roleMiddleware');

const {
  createCourse,
  getTeacherCourses,
  updateCourse,
  deleteCourse,
  getAllCourses,
} = require('../../controllers/teacher/courseController');

const db = require('../../config/db'); // your MySQL db
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

// Update a course
router.put('/:id', authenticateToken, verifyRole('teacher'), async (req, res) => {
  const courseId = req.params.id;
  const { title, description } = req.body;
  const teacherId = req.user.id; // assuming your token contains user id

  try {
    const [result] = await db.query(
      'UPDATE courses SET title = ?, description = ? WHERE id = ? AND teacher_id = ?',
      [title, description, courseId, teacherId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found or not yours' });
    }

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// module.exports = router;


// 🧑‍🏫 Teacher routes
router.post('/', auth, role('teacher'), createCourse);
router.get('/teacher', auth, role('teacher'), getTeacherCourses);
router.put('/:id', auth, role('teacher'), updateCourse);
router.delete('/:id', auth, role('teacher'), deleteCourse);

// 🎓 Public route for students
router.get('/', getAllCourses);

module.exports = router;
