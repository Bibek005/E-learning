const db = require('../config/db');

// Get student dashboard stats
exports.getDashboardStats = async (req, res) => {
  const studentId = req.user.id;

  try {
    // Count enrolled courses
    const [coursesRow] = await db.query(
      'SELECT COUNT(*) as total FROM enrollments WHERE student_id = ?',
      [studentId]
    );

    // Count completed quizzes
    const [quizzesRow] = await db.query(
      'SELECT COUNT(*) as total FROM quiz_submissions WHERE student_id = ? AND status="completed"',
      [studentId]
    );

    // Count submitted assignments
    const [assignmentsRow] = await db.query(
      'SELECT COUNT(*) as total FROM submissions WHERE student_id = ?',
      [studentId]
    );

    // Fetch recent courses (last 5 enrolled)
    const [recentCourses] = await db.query(
      `SELECT c.id, c.title, c.description 
       FROM courses c
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.student_id = ?
       ORDER BY e.enrolled_at DESC
       LIMIT 5`,
      [studentId]
    );

    res.json({
      totalCourses: coursesRow[0].total,
      completedQuizzes: quizzesRow[0].total,
      submittedAssignments: assignmentsRow[0].total,
      recentCourses
    });
  } catch (err) {
    console.error('Student Dashboard Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
