// pages/teacher/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from '../../services/api';

import { useAuth } from '../../context/AuthContext';


const Dashboard = () => {

    const { user, isLoggedIn, loading: authLoading } = useAuth(); // ← Rename `loading` to avoid conflict
  const [stats, setStats] = useState({
    courses: 0,
    assignments: 0,
    quizzes: 0,
    submissions: 0,
    quizAttempts: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          coursesRes,
          assignmentsRes,
          quizzesRes,
          submissionsRes,
          quizAttemptsRes,
          activityRes
        ] = await Promise.all([
          axios.get('/api/teacher/courses'),
          axios.get('/api/teacher/assignments'),
          axios.get('/api/teacher/quizzes'),
          axios.get('/api/teacher/submissions'),
          axios.get('/api/teacher/quiz-attempts'),
          axios.get('/api/teacher/activity'),
        ]);

        setStats({
          courses: coursesRes.data.length,
          assignments: assignmentsRes.data.length,
          quizzes: quizzesRes.data.length,
          submissions: submissionsRes.data.length,
          quizAttempts: quizAttemptsRes.data.length,
        });

        setRecentActivity(activityRes.data.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <main className="p-4 lg:ml-64">
        {/* Greeting */}
        <div className="text-center mb-8 mt-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
            Welcome Back, {user.name}!
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Here’s what’s happening in your courses today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
          {[
            { label: 'Your Courses', value: stats.courses, icon: BookOpenIcon, color: 'text-blue-500' },
            { label: 'Assignments', value: stats.assignments, icon: DocumentTextIcon, color: 'text-green-500' },
            { label: 'Quizzes', value: stats.quizzes, icon: QuizIcon, color: 'text-purple-500' },
            { label: 'Submissions', value: stats.submissions, icon: InboxIcon, color: 'text-orange-500' },
            { label: 'Quiz Attempts', value: stats.quizAttempts, icon: ChartBarIcon, color: 'text-indigo-500' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
                </div>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <li key={index} className="px-4 py-3 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-semibold">
                      {item.user_name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {item.action} {item.course_title && `in "${item.course_title}"`}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center text-gray-500">No recent activity</li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

// SVG Icons
const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const DocumentTextIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const QuizIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const InboxIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ChartBarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default Dashboard;