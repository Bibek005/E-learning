// const express = require('express');
// const router = express.Router();

// const authenticateToken = require('../middleware/authMiddleware');
// const verifyRole = require('../middleware/roleMiddleware');

// const {
//   getTeacherDashboard,
//   getTeacherCourses,
//   createTeacherCourse,
//   deleteTeacherCourse,
//   getTeacherAssignments,
//   createTeacherAssignment,
//   deleteTeacherAssignment,
//   getTeacherQuizzes,
//   createTeacherQuiz,
//   deleteTeacherQuiz,
//   getTeacherSubmissions,
//   gradeTeacherSubmission,
//   getTeacherStudents,
//   getTeacherProfile
// } = require('../controllers/teacherController');

// // Protect all teacher routes
// router.use(authenticateToken, verifyRole('teacher'));

// // Dashboard
// router.get('/dashboard', getTeacherDashboard);

// // Courses
// router.get('/courses', getTeacherCourses);
// router.post('/courses', createTeacherCourse);
// router.delete('/courses/:id', deleteTeacherCourse);

// // Assignments
// router.get('/assignments', getTeacherAssignments);z
// router.post('/assignments', createTeacherAssignment);
// router.delete('/assignments/:id', deleteTeacherAssignment);

// // Quizzes
// router.get('/quizzes', getTeacherQuizzes);
// router.post('/quizzes', createTeacherQuiz);
// router.delete('/quizzes/:id', deleteTeacherQuiz);

// // Submissions
// router.get('/submissions', getTeacherSubmissions);
// router.put('/submissions/:submissionId/grade', gradeTeacherSubmission);

// // Students
// router.get('/students', getTeacherStudents);

// // Profile
// router.get('/profile', getTeacherProfile);

// module.exports = router;
