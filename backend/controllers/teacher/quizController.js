const db = require('../../config/db');


exports.getTeacherQuizzes = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [rows] = await db.query(
      `SELECT q.*, c.title AS course_title
       FROM quizzes q
       JOIN courses c ON q.course_id = c.id
       WHERE c.teacher_id = ?`,
      [teacherId]
    );

    res.json(rows);
  } catch (err) {
    console.error('Error fetching teacher quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};



// exports.createTeacherQuiz = async (req, res) => {
//   const { title, description, course_id, due_date } = req.body;
//   try {
//     const [result] = await db.query(
//       'INSERT INTO quizzes (title, description, course_id, teacher_id, due_date) VALUES (?, ?, ?, ?, ?)',
//       [title, description, course_id, req.user.id, due_date]
//     );
//     res.json({ message: 'Quiz created successfully', id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.createTeacherQuiz = async (req, res) => {
  const { course_id, title, time_limit, questions } = req.body;
  const teacherId = req.user.id;

  try {
    // Verify course belongs to teacher
    const [courseCheck] = await db.query(
      `SELECT * FROM courses WHERE id = ? AND teacher_id = ?`,
      [course_id, teacherId]
    );
    if (courseCheck.length === 0)
      return res.status(403).json({ error: 'Unauthorized course access' });

    // Insert quiz (no description field!)
    const [quizResult] = await db.query(
      `INSERT INTO quizzes (course_id, title, time_limit, created_at)
       VALUES (?, ?, ?, NOW())`,
      [course_id, title, time_limit]
    );

    const quizId = quizResult.insertId;

    // Insert questions
    for (const q of questions) {
      await db.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer)
         VALUES (?, ?, ?, ?)`,
        [quizId, q.question_text, JSON.stringify(q.options), q.correct_answer]
      );
    }

    res.json({ id: quizId, course_id, title, time_limit });
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};





exports.deleteTeacherQuiz = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM quizzes WHERE id = ? AND teacher_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Quiz not found or not authorized' });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
