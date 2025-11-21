const express = require("express");
const auth = require("../../middleware/authMiddleware");

const upload = require("../../middleware/upload");
const { submitAssignment } = require("../../controllers/student/assignment.controller");

const router = express.Router();

router.post("/:assignmentId/submit", auth, upload.single("file"), submitAssignment);

module.exports = router;
