const db = require("../../config/db");

exports.getStudentStats = async (req, res) => {
  const studentId = req.user.id;

  try {
    const [[courseCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM enrollments WHERE student_id=?",
      [studentId]
    );

    const [[pendingAssignments]] = await db.query(
      `SELECT COUNT(*) AS total 
       FROM assignments a
       LEFT JOIN submissions s 
       ON a.id = s.assignment_id AND s.student_id = ?
       WHERE s.id IS NULL`,
      [studentId]
    );

    const [[quizCount]] = await db.query(
      "SELECT COUNT(*) AS total FROM quizzes"
    );

    res.json({
      courses: courseCount.total,
      pendingAssignments: pendingAssignments.total,
      quizzes: quizCount.total,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Stats fetch failed" });
  }
};
