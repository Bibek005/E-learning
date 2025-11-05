// server/controllers/adminController.js
const { db } = require('../config/db');

exports.getDashboardStats = (req, res) => {
  const queries = {
    students: 'SELECT COUNT(*) as total FROM users WHERE role = "student"',
    teachers: 'SELECT COUNT(*) as total FROM users WHERE role = "teacher"',
    courses: 'SELECT COUNT(*) as total FROM courses',
    enrollments: 'SELECT COUNT(*) as total FROM enrollments'
  };

  Promise.all(Object.values(queries).map(sql =>
    new Promise((resolve, reject) => {
      db.query(sql, (err, results) => err ? reject(err) : resolve(results[0].total));
    })
  ))
    .then(([students, teachers, courses, enrollments]) =>
      res.json({ totalStudents: students, totalTeachers: teachers, totalCourses: courses, totalEnrollments: enrollments })
    )
    .catch(err => res.status(500).json({ error: err.message }));
};
