const express = require("express");
const auth = require("../../middleware/authMiddleware");
const upload = require("../../middleware/upload");
const {
  listAssignments,
  getAssignmentById,
  submitAssignment,
} = require("../../controllers/student/assignment.controller");

const router = express.Router();

// GET /api/student/assignments  -> list all assignments (protected)
router.get("/", auth, listAssignments);

// GET /api/student/assignments/:assignmentId -> assignment detail (protected)
router.get("/:assignmentId", auth, getAssignmentById);

// POST /api/student/assignments/:assignmentId/submit -> submit assignment (protected)
router.post("/:assignmentId/submit", auth, upload.single("file"), submitAssignment);

module.exports = router;