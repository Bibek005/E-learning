// server/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elearning_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT id, name, email, password, role FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

// Admin Dashboard Stats
app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  const studentsSql = 'SELECT COUNT(*) as total FROM users WHERE role = "student"';
  const teachersSql = 'SELECT COUNT(*) as total FROM users WHERE role = "teacher"';
  const coursesSql = 'SELECT COUNT(*) as total FROM courses';
  const enrollmentsSql = 'SELECT COUNT(*) as total FROM enrollments';

  Promise.all([
    new Promise((resolve, reject) => {
      db.query(studentsSql, (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(teachersSql, (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(coursesSql, (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(enrollmentsSql, (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    })
  ])
    .then(([totalStudents, totalTeachers, totalCourses, totalEnrollments]) => {
      res.json({
        totalStudents,
        totalTeachers,
        totalCourses,
        totalEnrollments
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});



app.get('/api/admin/profile/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  const userId = req.params.id;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const sql = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Admin Users (CRUD)


// Update this route:
app.post('/api/admin/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  
  const { name, email, password, role } = req.body;

  // Validate password
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'User created', userId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to hash password' });
  }
});

// ✅ GET all users (for ManageUsers.jsx table)
app.get('/api/admin/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT 
      u.id, 
      u.name, 
      u.email, 
      u.role,
      (SELECT COUNT(*) FROM courses c WHERE c.teacher_id = u.id) as courses,
      (SELECT MAX(e.enrolled_at) FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE c.teacher_id = u.id) as lastLogin
    FROM users u
    WHERE u.role IN ('teacher', 'student')
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/api/admin/users/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
  db.query(sql, [name, email, role, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated' });
  });
});

app.delete('/api/admin/users/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
});

// Admin Logs
app.get('/api/admin/logs', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  const sql = `
    SELECT sl.timestamp, u.name as user_name, sl.action, sl.details
    FROM system_logs sl
    JOIN users u ON sl.user_id = u.id
    ORDER BY sl.timestamp DESC
    LIMIT 20
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET all courses for admin
app.get('/api/admin/courses', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT 
      c.id,
      c.title,
      c.description,
      c.status,
      u.name as teacher_name,
      (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) as enrollments
    FROM courses c
    LEFT JOIN users u ON c.teacher_id = u.id
    ORDER BY c.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err); // 👈 ADD THIS FOR DEBUGGING
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// DELETE course
app.delete('/api/admin/courses/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

  const courseId = req.params.id;

  // Optional: Check if course exists
  const checkSql = 'SELECT id FROM courses WHERE id = ?';
  db.query(checkSql, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Course not found' });

    // Delete course
    const deleteSql = 'DELETE FROM courses WHERE id = ?';
    db.query(deleteSql, [courseId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Course deleted' });
    });
  });
});
// ======================
// TEACHER ROUTES
// ======================

// Teacher Dashboard Stats
app.get('/api/teacher/dashboard', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const teacherId = req.user.id;

  const coursesSql = 'SELECT COUNT(*) as total FROM courses WHERE teacher_id = ?';
  const assignmentsSql = 'SELECT COUNT(*) as total FROM assignments a JOIN courses c ON a.course_id = c.id WHERE c.teacher_id = ?';
  const quizzesSql = 'SELECT COUNT(*) as total FROM quizzes q JOIN courses c ON q.course_id = c.id WHERE c.teacher_id = ?';
  const submissionsSql = `
    SELECT COUNT(*) as total 
    FROM submissions s 
    JOIN assignments a ON s.assignment_id = a.id 
    JOIN courses c ON a.course_id = c.id 
    WHERE c.teacher_id = ?
  `;
  const quizAttemptsSql = `
    SELECT COUNT(*) as total 
    FROM quiz_attempts qa 
    JOIN quizzes q ON qa.quiz_id = q.id 
    JOIN courses c ON q.course_id = c.id 
    WHERE c.teacher_id = ?
  `;

  Promise.all([
    new Promise((resolve, reject) => {
      db.query(coursesSql, [teacherId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(assignmentsSql, [teacherId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(quizzesSql, [teacherId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(submissionsSql, [teacherId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(quizAttemptsSql, [teacherId], (err, results) => {
        if (err) reject(err);
        else resolve(results[0].total);
      });
    })
  ])
    .then(([courses, assignments, quizzes, submissions, quizAttempts]) => {
      res.json({
        courses,
        assignments,
        quizzes,
        submissions,
        quizAttempts
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Teacher Profile
app.get('/api/teacher/profile', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = 'SELECT id, name, email, role FROM users WHERE id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

app.put('/api/teacher/profile', authenticateToken, async (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const { name } = req.body;
  const sql = 'UPDATE users SET name = ? WHERE id = ?';
  db.query(sql, [name, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Profile updated' });
  });
});

// Get Teacher's Courses
app.get('/api/teacher/courses', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = 'SELECT id, title, description FROM courses WHERE teacher_id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create Course
app.post('/api/teacher/courses', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const { title, description } = req.body;
  const sql = 'INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)';
  db.query(sql, [title, description, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Course created', courseId: result.insertId });
  });
});

// Get Course Enrollments
app.get('/api/teacher/courses/:courseId/enrollments', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT u.id, u.name, u.email, e.enrolled_at
    FROM enrollments e
    JOIN users u ON e.student_id = u.id
    WHERE e.course_id = ?
  `;
  db.query(sql, [req.params.courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Teacher's Assignments
app.get('/api/teacher/assignments', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT a.id, a.title, a.description, a.due_date, c.title as course_title
    FROM assignments a
    JOIN courses c ON a.course_id = c.id
    WHERE c.teacher_id = ?
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create Assignment
app.post('/api/teacher/assignments', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const { course_id, title, description, due_date } = req.body;
  const sql = 'INSERT INTO assignments (course_id, title, description, due_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [course_id, title, description, due_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Assignment created', assignmentId: result.insertId });
  });
});

// Get Assignment Submissions
app.get('/api/teacher/assignments/:assignmentId/submissions', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT s.id, u.name as student_name, s.file_url, s.status, s.grade, s.feedback, s.submitted_at
    FROM submissions s
    JOIN users u ON s.student_id = u.id
    WHERE s.assignment_id = ?
  `;
  db.query(sql, [req.params.assignmentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Teacher's Quizzes
app.get('/api/teacher/quizzes', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT q.id, q.title, q.description, q.time_limit, c.title as course_title
    FROM quizzes q
    JOIN courses c ON q.course_id = c.id
    WHERE c.teacher_id = ?
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Create Quiz
app.post('/api/teacher/quizzes', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const { course_id, title, description, time_limit } = req.body;
  // For simplicity, we'll store questions as JSON in a TEXT column later
  const sql = 'INSERT INTO quizzes (course_id, title, description, time_limit) VALUES (?, ?, ?, ?)';
  db.query(sql, [course_id, title, description, time_limit], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Quiz created', quizId: result.insertId });
  });
});

// Get Quiz Attempts
app.get('/api/teacher/quizzes/:quizId/attempts', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT qa.id, u.name as student_name, qa.score, qa.total_questions, qa.completed_at
    FROM quiz_attempts qa
    JOIN users u ON qa.student_id = u.id
    WHERE qa.quiz_id = ?
  `;
  db.query(sql, [req.params.quizId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Recent Activity for Teacher
app.get('/api/teacher/activity', authenticateToken, (req, res) => {
  if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Access denied' });

  const sql = `
    SELECT 
      sl.timestamp,
      u.name as user_name,
      sl.action,
      c.title as course_title
    FROM system_logs sl
    LEFT JOIN users u ON sl.user_id = u.id
    LEFT JOIN courses c ON sl.details LIKE CONCAT('%course_id:', c.id, '%')
    WHERE c.teacher_id = ? OR sl.user_id = ?
    ORDER BY sl.timestamp DESC
    LIMIT 10
  `;
  db.query(sql, [req.user.id, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});