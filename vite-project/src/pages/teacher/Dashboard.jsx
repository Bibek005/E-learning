// src/pages/teacher/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    pendingSubmissions: 0,
    avgQuizScore: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teacher stats from backend
    fetch('/api/teacher/dashboard', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Total Courses</h3>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Enrolled Students</h3>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Pending Submissions</h3>
          <p className="text-2xl font-bold">{stats.pendingSubmissions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-gray-500">Avg Quiz Score</h3>
          <p className="text-2xl font-bold">{stats.avgQuizScore}%</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/teacher/courses')}
              className="block w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded"
            >
              Manage My Courses
            </button>
            <button
              onClick={() => navigate('/teacher/assignments')}
              className="block w-full text-left px-4 py-2 bg-green-100 hover:bg-green-200 rounded"
            >
              Post New Assignment
            </button>
            <button
              onClick={() => navigate('/teacher/quizzes')}
              className="block w-full text-left px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded"
            >
              Create Quiz
            </button>
            <button
              onClick={() => navigate('/teacher/submissions')}
              className="block w-full text-left px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded"
            >
              Evaluate Submissions
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="text-sm">Posted "Midterm Assignment" - 2 days ago</li>
            <li className="text-sm">Graded 5 submissions for "Course Intro"</li>
            <li className="text-sm">Uploaded new lecture notes for "Week 3"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;