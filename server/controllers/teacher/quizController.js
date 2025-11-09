const db = require('../../config/db');

exports.getTeacherQuizzes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM quizzes WHERE teacher_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTeacherQuiz = async (req, res) => {
  const { title, description, course_id, due_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO quizzes (title, description, course_id, teacher_id, due_date) VALUES (?, ?, ?, ?, ?)',
      [title, description, course_id, req.user.id, due_date]
    );
    res.json({ message: 'Quiz created successfully', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
