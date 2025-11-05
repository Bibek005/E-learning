const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const materialRoutes = require('./routes/materialRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
