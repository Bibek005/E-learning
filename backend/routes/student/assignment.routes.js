<<<<<<< HEAD
// const express = require("express");
// const auth = require("../../middleware/authMiddleware");
// const upload = require("../../middleware/upload");
// const {
//   listAssignments,
//   getAssignmentById,
//   submitAssignment,
// } = require("../../controllers/student/assignment.controller");

// const router = express.Router();

// // GET /api/student/assignments  -> list all assignments (protected)
// router.get("/", auth, listAssignments);

// // GET /api/student/assignments/:assignmentId -> assignment detail (protected)
// router.get("/:assignmentId", auth, getAssignmentById);

// // POST /api/student/assignments/:assignmentId/submit -> submit assignment (protected)
// router.post("/:assignmentId/submit", auth, upload.single("file"), submitAssignment);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");  
const { submitAssignment } = require("../../controllers/student/assignment.controller");

// POST /api/student/assignments/submit/12
router.post("/submit/:assignmentId", upload.single("file"), submitAssignment);
=======
const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");

const { submitAssignment, getAssignments } = require("../../controllers/student/assignment.controller");
const auth = require("../../middleware/authMiddleware");

// ----------------------
//     STUDENT ROUTES
// ----------------------

// Get all assignments for logged-in student
router.get("/", auth, getAssignments);

// Submit assignment with file upload
router.post(
  "/submit/:assignmentId",
  auth,
  upload.single("file"),
  submitAssignment
);
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0

module.exports = router;
