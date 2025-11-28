const db = require('../../config/db');

// Get quizzes of logged-in teacher
exports.getTeacherQuizzes = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [rows] = await db.query(
      `SELECT q.id, q.title, q.time_limit, c.title AS course_title
       FROM quizzes q
       JOIN courses c ON q.course_id = c.id
       WHERE q.teacher_id = ?`,
      [teacherId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching teacher quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

// Create a new quiz
exports.createTeacherQuiz = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { course_id, title, time_limit, questions } = req.body;

    // Verify the course belongs to teacher
    const [courseCheck] = await db.query(
      `SELECT * FROM courses WHERE id = ? AND teacher_id = ?`,
      [course_id, teacherId]
    );
    if (courseCheck.length === 0)
      return res.status(403).json({ error: 'Unauthorized course access' });

    // Insert quiz with teacher_id
    const [quizResult] = await db.query(
      `INSERT INTO quizzes (course_id, title, time_limit, created_at, teacher_id)
       VALUES (?, ?, ?, NOW(), ?)`,
      [course_id, title, time_limit, teacherId]
    );

    const quizId = quizResult.insertId;

    // Insert questions
    for (const q of questions) {
      await db.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer)
         VALUES (?, ?, ?, ?)`,
        [quizId, q.question_text, JSON.stringify(q.options), parseInt(q.correct_answer)]
      );
    }

    res.json({ id: quizId, course_id, title, time_limit });
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Delete a quiz
exports.deleteTeacherQuiz = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const quizId = req.params.id;

    const [result] = await db.query(
      `DELETE q
       FROM quizzes q
       JOIN courses c ON q.course_id = c.id
       WHERE q.id = ? AND c.teacher_id = ?`,
      [quizId, teacherId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Quiz not found or unauthorized' });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error('Error deleting quiz:', err);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};
