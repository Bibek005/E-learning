const fs = require("fs").promises;
const path = require("path");

const dataFile = path.join(__dirname, "..", "..", "data", "assignments.json");

async function readAssignments() {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

async function writeAssignments(data) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf8");
}

exports.listAssignments = async (req, res) => {
  try {
    const assignments = await readAssignments();
    res.json({ assignments });
  } catch (err) {
    console.error("listAssignments error", err);
    res.status(500).json({ message: "Failed to load assignments" });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignments = await readAssignments();
    const { assignmentId } = req.params;
    const assignment = assignments.find((a) => String(a.id) === String(assignmentId));
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json({ assignment });
  } catch (err) {
    console.error("getAssignmentById error", err);
    res.status(500).json({ message: "Failed to load assignment" });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const userId = req.user?.id || "anonymous"; // depends on your auth payload
    // store submission record in the assignments data file to keep things simple
    const assignments = await readAssignments();
    const idx = assignments.findIndex((a) => String(a.id) === String(assignmentId));
    if (idx === -1) return res.status(404).json({ message: "Assignment not found" });

    const submission = {
      id: Date.now(),
      userId,
      file: req.file ? `/uploads/${req.file.filename}` : null,
      message: req.body.message || null,
      submittedAt: new Date().toISOString(),
    };

    assignments[idx].submissions = assignments[idx].submissions || [];
    assignments[idx].submissions.push(submission);

    await writeAssignments(assignments);

    res.status(201).json({ message: "Submission received", submission });
  } catch (err) {
    console.error("submitAssignment error", err);
    res.status(500).json({ message: "Failed to submit assignment" });
  }
};