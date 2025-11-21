const express = require("express");
const auth = require("../../middleware/authMiddleware");
const quizController = require("../../controllers/student/quiz.controller");

if (typeof auth !== 'function') {
  console.error('quiz.routes: auth middleware is not a function. Check backend/middleware/authMiddleware.js export.');
}
if (!quizController || typeof quizController.getQuiz !== 'function' || typeof quizController.submitQuiz !== 'function') {
  console.error('quiz.routes: quizController missing methods. Check backend/controllers/student/quiz.controller.js exports:', quizController);
}

const router = express.Router();

router.get("/:quizId", auth, quizController.getQuiz);
router.post("/:quizId/submit", auth, quizController.submitQuiz);

module.exports = router;