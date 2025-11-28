<<<<<<< HEAD

// server/routes/teacher/courseRoutes.js
=======
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/authMiddleware');
const role = require('../../middleware/roleMiddleware');
<<<<<<< HEAD
=======
const upload = require('../../middleware/uploadMiddleware');
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0

const {
  createCourse,
  getTeacherCourses,
  updateCourse,
  deleteCourse,
  getAllCourses,
} = require('../../controllers/teacher/courseController');

<<<<<<< HEAD
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
=======
// Create Course
router.post(
  '/',
  auth,
  role('teacher'),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'course_image', maxCount: 1 } // rename to match frontend FormData
  ]),
  createCourse
);

// Get all courses of logged-in teacher
router.get('/teacher', auth, role('teacher'), getTeacherCourses);

// Update a course
router.put(
  '/:id',
  auth,
  role('teacher'),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'course_image', maxCount: 1 }
  ]),
  updateCourse
);

// Delete a course
router.delete('/:id', auth, role('teacher'), deleteCourse);

// Public route for students
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
router.get('/', getAllCourses);

module.exports = router;
