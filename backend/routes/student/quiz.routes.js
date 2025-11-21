const express = require("express");
const auth = require("../../middleware/authMiddleware");

const { getQuiz, submitQuiz } = require("../../controllers/student/quiz.controller");

const router = express.Router();

router.get("/:quizId", auth, getQuiz);
router.post("/:quizId/submit", auth, submitQuiz);

module.exports = router;
