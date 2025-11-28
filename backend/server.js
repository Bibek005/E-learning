const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS FIX
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.options("*", cors());

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teacherRoutes = require("./routes/teacher/index");
const courseRoutesTeacher = require("./routes/teacher/courseRoutes");
const materialRoutesTeacher = require("./routes/teacher/materialRoutes");

const studentDashboardRoutes = require("./routes/student/dashboard.routes");
const studentCourseRoutes = require("./routes/student/course.routes");
const studentQuizRoutes = require("./routes/student/quiz.routes");
const studentAssignmentRoutes = require("./routes/student/assignment.routes");
const studentStatsRoutes = require("./routes/student/stats.routes");

// Student Routes
app.use("/api/student/dashboard", studentDashboardRoutes);
app.use("/api/student/courses", studentCourseRoutes);
app.use("/api/student/quiz", studentQuizRoutes);
app.use("/api/student/assignments", studentAssignmentRoutes);
app.use("/api/student/stats", studentStatsRoutes);

// Global Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/courses", courseRoutesTeacher);
app.use("/api/materials", materialRoutesTeacher);

// Blog / Posts route (new)
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/posts", blogRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // -----------------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


(async () => {
  // const db = await initDB(); // DB ready
  global.db = db; // optional: make pool global if needed

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

