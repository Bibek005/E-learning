const db = require('../../config/db');

exports.getDashboard = async (req, res) => {
  const studentId = req.user.id; // From authMiddleware
  try {
    // Get enrolled courses
    const [courses] = await db.query(
      `SELECT c.id AS courseId, c.title, c.instructor, e.progress, e.enrolled_at AS enrolledAt
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.user_id = ?`,
      [studentId]
    );

    // For each course, fetch assignments and quizzes
    for (let course of courses) {
      const [assignments] = await db.query(
        `SELECT id, title, due_date AS dueDate,
          submitted = IFNULL((SELECT 1 FROM submissions s WHERE s.assignment_id = a.id AND s.user_id = ?), 0) AS submitted
         FROM assignments a
         WHERE a.course_id = ?`,
        [studentId, course.courseId]
      );
      course.assignments = assignments;

      const [quizzes] = await db.query(
        `SELECT id, title, due_date AS dueDate,
          attempted = IFNULL((SELECT 1 FROM quiz_submissions q WHERE q.quiz_id = quiz.id AND q.user_id = ?), 0) AS attempted
         FROM quizzes quiz
         WHERE quiz.course_id = ?`,
        [studentId, course.courseId]
      );
      course.quizzes = quizzes;
    }

    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
