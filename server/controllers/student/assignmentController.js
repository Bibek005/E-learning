const db = require('../../config/db');

exports.submitAssignment = async (req, res) => {
  const studentId = req.user.id;
  const { assignmentId } = req.params;
  const { text } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    await db.query(
      `INSERT INTO submissions (assignment_id, user_id, text, file, submitted_at)
       VALUES (?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE text=?, file=?, submitted_at=NOW()`,
      [assignmentId, studentId, text, file, text, file]
    );
    res.json({ message: 'Assignment submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
