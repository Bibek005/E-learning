const db = require('../../config/db');

exports.getQuiz = async (req, res) => {
  const { quizId } = req.params;
  try {
    const [rows] = await db.query('SELECT id, title, duration FROM quizzes WHERE id=?', [quizId]);
    if (!rows.length) return res.status(404).json({ message: 'Quiz not found' });

    const [questions] = await db.query(
      'SELECT id, text FROM quiz_questions WHERE quiz_id=?',
      [quizId]
    );

    for (let q of questions) {
      const [options] = await db.query(
        'SELECT id, text FROM quiz_options WHERE question_id=?',
        [q.id]
      );
      q.options = options;
    }

    res.json({ ...rows[0], questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.submitQuiz = async (req, res) => {
  const studentId = req.user.id;
  const { quizId } = req.params;
  const { answers } = req.body;

  try {
    for (let qId in answers) {
      await db.query(
        `INSERT INTO quiz_submissions (quiz_id, question_id, user_id, selected_option, submitted_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [quizId, qId, studentId, answers[qId]]
      );
    }
    res.json({ message: 'Quiz submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
