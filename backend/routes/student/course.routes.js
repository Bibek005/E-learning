const express = require("express");
<<<<<<< HEAD
const auth = require("../../middleware/authMiddleware");


const {
  getMyCourses,
  getCourseDetail
} = require("../../controllers/student/course.controller");

const router = express.Router();

router.get("/", auth, getMyCourses);
router.get("/:courseId", auth, getCourseDetail);
=======
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");

const {
  getMyCourses,
  getCourseDetail,
} = require("../../controllers/student/course.controller");

// PROTECT ROUTES
router.get("/", verifyToken, getMyCourses);
router.get("/:courseId", verifyToken, getCourseDetail);
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0

module.exports = router;
