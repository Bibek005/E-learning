const db = require("../../config/db");

// Get overall student stats
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

// Get progress for a single course
exports.getCourseProgress = async (req, res) => {
  const studentId = req.user.id;
  const courseId = req.params.courseId;

  try {
    const [[assignTotal]] = await db.query(
      "SELECT COUNT(*) AS total FROM assignments WHERE course_id = ?",
      [courseId]
    );

    const [[assignDone]] = await db.query(
      `SELECT COUNT(*) AS done 
       FROM submissions 
       WHERE student_id = ? AND assignment_id IN 
       (SELECT id FROM assignments WHERE course_id = ?)`,
      [studentId, courseId]
    );

    const [[quizTotal]] = await db.query(
      "SELECT COUNT(*) AS total FROM quizzes WHERE course_id = ?",
      [courseId]
    );

    const [[quizDone]] = await db.query(
      `SELECT COUNT(*) AS done 
       FROM quiz_attempts 
       WHERE student_id = ? AND quiz_id IN 
       (SELECT id FROM quizzes WHERE course_id = ?)`,
      [studentId, courseId]
    );

    const total = assignTotal.total + quizTotal.total;
    const completed = assignDone.done + quizDone.done;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({ progress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch course progress" });
  }
};
