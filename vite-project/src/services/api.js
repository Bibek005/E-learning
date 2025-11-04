



// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout if 401 (Unauthorized)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ======================
// AUTH API
// ======================
export const loginApi = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// ======================
// ADMIN APIs
// ======================
export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};


export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const createAdminUser = async (userData) => {
  const response = await api.post('/admin/users', userData);
  return response.data;
};

export const updateAdminUser = async (userId, userData) => {
  const response = await api.put(`/admin/users/${userId}`, userData);
  return response.data;
};

export const deleteAdminUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAdminLogs = async () => {
  const response = await api.get('/admin/logs');
  return response.data;
};

// Get all courses (for admin)
export const getAdminCourses = async () => {
  const response = await api.get('/admin/courses');
  return response.data;
};

// Delete a course
export const deleteAdminCourse = async (courseId) => {
  const response = await api.delete(`/admin/courses/${courseId}`);
  return response.data;
};

// Get admin profile
export const getAdminProfile = async (adminId) => {
  const response = await api.get(`/admin/profile/${adminId}`);
  return response.data;
};

// Update admin profile
export const updateAdminProfile = async (userId, userData) => {
  const response = await api.put(`/admin/users/${userId}`, userData);
  return response.data;
};

// ======================
// TEACHER APIs
// ======================
export const getTeacherDashboard = async () => {
  const response = await api.get('/teacher/dashboard');
  return response.data;
};


// export const getTeacherProfile = async (teacherId) => {
//   const response = await api.get(`/teacher/profile/${teacherId}`);
//   return response.data;
// };

// export const updateTeacherProfile = async (userId, userData) => {
//   const response = await api.put(`/teacher/profile/${teacherId}`, userdata);
//   return response.data;
// };



// ✅ Correct
export const getTeacherProfile = async () => {
  const response = await api.get('/teacher/profile');
  return response.data;
};

export const updateTeacherProfile = async (userData) => {
  const response = await api.put('/teacher/profile', userData);
  return response.data;
};


export const deleteTeacherCourse = async (courseId) => {
  const response = await api.delete(`/teacher/courses/${courseId}`);
  return response.data;
}; 

export const getTeacherCourses = async () => {
  const response = await api.get('/teacher/courses');
  return response.data;
};

export const createTeacherCourse = async (courseData) => {
  const response = await api.post('/teacher/courses', courseData);
  return response.data;
};

export const getCourseEnrollments = async (courseId) => {
  const response = await api.get(`/teacher/courses/${courseId}/enrollments`);
  return response.data;
};

export const getTeacherAssignments = async () => {
  const response = await api.get('/teacher/assignments');
  return response.data;
};

export const createTeacherAssignment = async (assignmentData) => {
  const response = await api.post('/teacher/assignments', assignmentData);
  return response.data;
};

export const getAssignmentSubmissions = async (assignmentId) => {
  const response = await api.get(`/teacher/assignments/${assignmentId}/submissions`);
  return response.data;
};

export const getTeacherQuizzes = async () => {
  const response = await api.get('/teacher/quizzes');
  return response.data;
};

export const createTeacherQuiz = async (quizData) => {
  const response = await api.post('/teacher/quizzes', quizData);
  return response.data;
};

export const getQuizAttempts = async (quizId) => {
  const response = await api.get(`/teacher/quizzes/${quizId}/attempts`);
  return response.data;
};

export const getTeacherActivity = async () => {
  const response = await api.get('/teacher/activity');
  return response.data;
};



// Export axios instance for direct use if needed
export default api;