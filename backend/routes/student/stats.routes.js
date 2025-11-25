const express = require("express");
const auth = require("../../middleware/authMiddleware");
const { getStudentStats } = require("../../controllers/student/stats.controller");

const router = express.Router();

router.get("/", auth, getStudentStats);

const { getStudentStats, getCourseProgress } = require("../../controllers/student/stats.controller");

router.get("/", auth, getStudentStats);

// NEW — course progress route
router.get("/:courseId/progress", auth, getCourseProgress);
su

module.exports = router;
