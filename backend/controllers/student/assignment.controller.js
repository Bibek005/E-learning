const db = require("../../config/db");

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
