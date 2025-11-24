const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const { submitAssignment, getAssignments } = require("../../controllers/student/assignment.controller");

// GET all assignments
router.get("/", getAssignments);

// SUBMIT
router.post("/submit/:assignmentId", upload.single("file"), submitAssignment);

module.exports = router;
