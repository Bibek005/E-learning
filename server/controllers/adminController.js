// server/controllers/adminController.js
const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
  try {
    const [studentsRow] = await db.query('SELECT COUNT(*) as total FROM users WHERE role = "student"');
    const [teachersRow] = await db.query('SELECT COUNT(*) as total FROM users WHERE role = "teacher"');
    const [coursesRow] = await db.query('SELECT COUNT(*) as total FROM courses');
    const [enrollmentsRow] = await db.query('SELECT COUNT(*) as total FROM enrollments');

    res.json({
      totalStudents: studentsRow[0].total,
      totalTeachers: teachersRow[0].total,
      totalCourses: coursesRow[0].total,
      totalEnrollments: enrollmentsRow[0].total
    });
  } catch (err) {
    console.error('Dashboard Stats Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

