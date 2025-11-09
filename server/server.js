const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Test route
app.get('/', (req, res) => {
  res.send('E-Learning API running...');
});

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/teacher/courseRoutes');
const materialRoutes = require('./routes/teacher/materialRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacher/index');

const assignmentRoutes = require('./routes/teacher/assignmentRoutes');
app.use('/api/teacher/assignments', assignmentRoutes);



// // ✅ Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/materials', materialRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/teacher', teacherRoutes);


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/teacher', require('./routes/teacher/index'));
app.use('/api/courses', require('./routes/teacher/courseRoutes'));      // optional direct access
app.use('/api/materials', require('./routes/teacher/materialRoutes'));  // optional direct access

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
