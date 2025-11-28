const express = require("express");
const auth = require("../../middleware/authMiddleware");
<<<<<<< HEAD
const { getStudentStats } = require("../../controllers/student/stats.controller");

const router = express.Router();

router.get("/", auth, getStudentStats);

=======
const { getStudentStats, getCourseProgress } = require("../../controllers/student/stats.controller");

const router = express.Router();

// Overall student stats
router.get("/", auth, getStudentStats);

// Progress for a specific course
router.get("/:courseId/progress", auth, getCourseProgress);

>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
module.exports = router;
