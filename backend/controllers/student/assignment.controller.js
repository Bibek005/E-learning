const db = require("../../config/db");

exports.getAssignments = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [assignments] = await db.query(`
      SELECT a.id, a.title, a.description, a.deadline, c.title AS course_title
      FROM assignments a
      INNER JOIN courses c ON c.id = a.course_id
      INNER JOIN enrollments e ON e.course_id = a.course_id
      WHERE e.student_id = ?
    `, [studentId]);

    res.json(assignments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to load assignments" });
  }
};




exports.submitAssignment = async (req, res) => {
  const assignmentId = req.params.assignmentId;
  const studentId = req.user.id;
  const fileUrl = req.file.filename;

  await db.query(
    `INSERT INTO submissions (assignment_id, student_id, file_url, status, submitted_at)
     VALUES (?,?,?,?,NOW())`,
    [assignmentId, studentId, fileUrl, "submitted"]
  );

  res.json({ success: true, file: fileUrl });
};
