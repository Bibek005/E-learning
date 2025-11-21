const express = require("express");
const auth = require("../../middleware/authMiddleware");


const {
  getMyCourses,
  getCourseDetail
} = require("../../controllers/student/course.controller");

const router = express.Router();

router.get("/", auth, getMyCourses);
router.get("/:courseId", auth, getCourseDetail);

module.exports = router;
