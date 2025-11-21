const express = require("express");
const auth = require("../../middleware/authMiddleware");
const { getStudentStats } = require("../../controllers/student/stats.controller");

const router = express.Router();

router.get("/", auth, getStudentStats);

module.exports = router;
