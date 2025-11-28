<<<<<<< HEAD
// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('../../middleware/authMiddleware');
// const verifyRole = require('../../middleware/roleMiddleware');
// const { 
//   getTeacherAssignments, 
//   createTeacherAssignment, 
//   deleteTeacherAssignment 
// } = require('../../controllers/teacher/assignmentController');

// router.use(authenticateToken, verifyRole('teacher'));

// router.get('/assignments', getTeacherAssignments);
// router.post('/assignments', createTeacherAssignment);
// router.delete('/assignments/:id', deleteTeacherAssignment);

// module.exports = router;


// server/routes/teacher/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../../config/db'); // your MySQL pool
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

// Get all assignments for the logged-in teacher
=======
// server/routes/teacher/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const authenticateToken = require('../../middleware/authMiddleware');
const verifyRole = require('../../middleware/roleMiddleware');

// GET all assignments
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
router.get('/', authenticateToken, verifyRole('teacher'), async (req, res) => {
  const teacherId = req.user.id;
  try {
    const [rows] = await pool.query(
      'SELECT a.*, c.title AS course_title FROM assignments a JOIN courses c ON a.course_id = c.id WHERE c.teacher_id = ?',
      [teacherId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD
// Create assignment
=======
// CREATE assignment
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
router.post('/', authenticateToken, verifyRole('teacher'), async (req, res) => {
  const teacherId = req.user.id;
  const { course_id, title, description, due_date } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO assignments (course_id, title, description, due_date, teacher_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [course_id, title, description, due_date, teacherId]
    );

    const [assignment] = await pool.query('SELECT * FROM assignments WHERE id = ?', [result.insertId]);
    res.status(201).json(assignment[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD
// Delete assignment
=======
// DELETE assignment
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
router.delete('/:id', authenticateToken, verifyRole('teacher'), async (req, res) => {
  const teacherId = req.user.id;
  const assignmentId = req.params.id;

  try {
    const [result] = await pool.query(
      'DELETE FROM assignments WHERE id = ? AND teacher_id = ?',
      [assignmentId, teacherId]
    );

<<<<<<< HEAD
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Assignment not found or not yours' });
=======
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Assignment not found or not yours' });
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0

    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD
// Update assignment
=======
// UPDATE assignment
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
router.put('/:id', authenticateToken, verifyRole('teacher'), async (req, res) => {
  const teacherId = req.user.id;
  const assignmentId = req.params.id;
  const { course_id, title, description, due_date } = req.body;

  try {
<<<<<<< HEAD
    // Only allow updating assignments that belong to this teacher
    const [result] = await pool.query(
      'UPDATE assignments SET course_id = ?, title = ?, description = ?, due_date = ? WHERE id = ? AND teacher_id = ?',
      [course_id, title, description, due_date, assignmentId, teacherId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Assignment not found or not yours' });

    const [updatedAssignment] = await pool.query('SELECT * FROM assignments WHERE id = ?', [assignmentId]);
    res.json(updatedAssignment[0]);
=======
    const [result] = await pool.query(
      'UPDATE assignments SET course_id=?, title=?, description=?, due_date=? WHERE id=? AND teacher_id=?',
      [course_id, title, description, due_date, assignmentId, teacherId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Assignment not found or not yours' });

    const [updated] = await pool.query('SELECT * FROM assignments WHERE id = ?', [assignmentId]);
    res.json(updated[0]);
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

<<<<<<< HEAD

=======
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
module.exports = router;
