const db = require("../../config/db");

exports.getQuiz = async (req, res) => {
  const { quizId } = req.params;

  const [quiz] = await db.query(`SELECT * FROM quizzes WHERE id=?`, [quizId]);
  const [questions] = await db.query(
    `SELECT id, question_text AS text, options
     FROM quiz_questions WHERE quiz_id=?`,
    [quizId]
  );

  res.json({
    ...quiz[0],
    questions: questions.map(q => ({
      ...q,
      options: JSON.parse(q.options)
    }))
  });
};

exports.submitQuiz = async (req, res) => {
  const { quizId } = req.params;
  const studentId = req.user.id;
  const { answers } = req.body;

  const [qList] = await db.query(
    `SELECT id, correct_answer FROM quiz_questions WHERE quiz_id=?`,
    [quizId]
  );

  let score = 0;
  qList.forEach(q => {
    if (answers[q.id] == q.correct_answer) score++;
  });

  await db.query(
    `INSERT INTO quiz_attempts (quiz_id, student_id, score, attempt_time, answers)
     VALUES (?,?,?,?,?)`,
    [quizId, studentId, score, new Date(), JSON.stringify(answers)]
  );

  res.json({ success: true, score });
};
