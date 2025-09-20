// // src/services/api.js
// const API_BASE = 'http://localhost:5000/api';

// export const loginApi = async (credentials) => {
//   const res = await fetch(`${API_BASE}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials)
//   });
//   if (!res.ok) throw new Error('Login failed');
//   return res.json();
// };

// // Admin APIs
// export const getAdminDashboard = async (token) => {
//   const res = await fetch(`${API_BASE}/admin/dashboard`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load dashboard');
//   return res.json();
// };

// export const getAdminProfile = async (adminId, token) => {
//   const res = await fetch(`${API_BASE}/admin/profile/${adminId}`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load profile');
//   return res.json();
// };

// export const getAdminUsers = async (token) => {
//   const res = await fetch(`${API_BASE}/admin/users`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load users');
//   return res.json();
// };

// export const createAdminUser = async (userData, token) => {
//   const res = await fetch(`${API_BASE}/admin/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(userData)
//   });
//   if (!res.ok) throw new Error('Failed to create user');
//   return res.json();
// };

// export const updateAdminUser = async (userId, userData, token) => {
//   const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(userData)
//   });
//   if (!res.ok) throw new Error('Failed to update user');
//   return res.json();
// };

// export const deleteAdminUser = async (userId, token) => {
//   const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
//     method: 'DELETE',
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to delete user');
//   return res.json();
// };

// export const getAdminLogs = async (token) => {
//   const res = await fetch(`${API_BASE}/admin/logs`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load logs');
//   return res.json();
// };

// // Teacher APIs
// export const getTeacherDashboard = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/dashboard`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load teacher dashboard');
//   return res.json();
// };

// export const getTeacherProfile = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/profile`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load profile');
//   return res.json();
// };

// export const updateTeacherProfile = async (data, token) => {
//   const res = await fetch(`${API_BASE}/teacher/profile`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) throw new Error('Failed to update profile');
//   return res.json();
// };

// export const getTeacherCourses = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/courses`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load courses');
//   return res.json();
// };

// export const createTeacherCourse = async (courseData, token) => {
//   const res = await fetch(`${API_BASE}/teacher/courses`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(courseData)
//   });
//   if (!res.ok) throw new Error('Failed to create course');
//   return res.json();
// };

// export const getCourseEnrollments = async (courseId, token) => {
//   const res = await fetch(`${API_BASE}/teacher/courses/${courseId}/enrollments`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load enrollments');
//   return res.json();
// };

// export const getTeacherAssignments = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/assignments`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load assignments');
//   return res.json();
// };

// export const createTeacherAssignment = async (assignmentData, token) => {
//   const res = await fetch(`${API_BASE}/teacher/assignments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(assignmentData)
//   });
//   if (!res.ok) throw new Error('Failed to create assignment');
//   return res.json();
// };

// export const getAssignmentSubmissions = async (assignmentId, token) => {
//   const res = await fetch(`${API_BASE}/teacher/assignments/${assignmentId}/submissions`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load submissions');
//   return res.json();
// };

// export const getTeacherQuizzes = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/quizzes`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load quizzes');
//   return res.json();
// };

// export const createTeacherQuiz = async (quizData, token) => {
//   const res = await fetch(`${API_BASE}/teacher/quizzes`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify(quizData)
//   });
//   if (!res.ok) throw new Error('Failed to create quiz');
//   return res.json();
// };

// export const getQuizAttempts = async (quizId, token) => {
//   const res = await fetch(`${API_BASE}/teacher/quizzes/${quizId}/attempts`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load quiz attempts');
//   return res.json();
// };

// export const getTeacherActivity = async (token) => {
//   const res = await fetch(`${API_BASE}/teacher/activity`, {
//     headers: { 'Authorization': `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to load activity');
//   return res.json();
// };









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

export const getTeacherProfile = async () => {
  const response = await api.get('/teacher/profile');
  return response.data;
};

export const updateTeacherProfile = async (data) => {
  const response = await api.put('/teacher/profile', data);
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