const pool = require('../config/db');

// ✅ Create Course
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;
  const teacherId = req.user.id;

  try {
    const [result] = await pool.query(
      'INSERT INTO courses (title, description, teacher_id) VALUES (?, ?, ?)',
      [title, description, teacherId]
    );
    res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Courses (Teacher-specific)
exports.getTeacherCourses = async (req, res) => {
  const teacherId = req.user.id;

  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE teacher_id = ?', [teacherId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const teacherId = req.user.id;

  try {
    const [result] = await pool.query(
      'UPDATE courses SET title=?, description=?, status=? WHERE id=? AND teacher_id=?',
      [title, description, status, id, teacherId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Course not found or unauthorized' });

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  const teacherId = req.user.id;

  try {
    const [result] = await pool.query('DELETE FROM courses WHERE id=? AND teacher_id=?', [id, teacherId]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Course not found or unauthorized' });

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Active Courses (For students)
exports.getAllCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT c.*, u.name as teacher_name FROM courses c JOIN users u ON c.teacher_id = u.id WHERE c.status = "Active"'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
