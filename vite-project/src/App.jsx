// ✅ CORRECTED APP.JSX
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';


import Landingpage from './pages/Landingpage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCourses from './pages/admin/ManageCourses';
import Profile from './pages/admin/Profile';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherCourses from './pages/teacher/Courses'
import TeacherProfile from './pages/teacher/Profile';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherQuizzes from './pages/teacher/Quizzes';
import TeacherSubmissions from './pages/teacher/Submissions';



function AppContent() {
  const { user, isLoggedIn, loading, logout } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Navbar />

      {/* Only show Sidebar if user is logged in */}
      {isLoggedIn && user && (
        <Sidebar userRole={user.role} userName={user.name} />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes - Protected */}
        {isLoggedIn && user?.role === 'admin' ? (
          <>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/profile" element={<Profile />} />
          </>
        ) : null}

        {/* Teacher Routes - Protected */}
        {isLoggedIn && user?.role === 'teacher' ? (
          <>
                   <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/courses" element={<TeacherCourses />} />
            <Route path="/teacher/assignments" element={<TeacherAssignments />} />
            <Route path="/teacher/quizzes" element={<TeacherQuizzes />} />
            <Route path="/teacher/submissions" element={<TeacherSubmissions />} />
            <Route path="/teacher/profile" element={<TeacherProfile />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </>
        ) : null}

        {/* Redirect unauthorized access */}
        <Route path="/admin/*" element={<Navigate to="/login" replace />} />
        <Route path="/teacher/*" element={<Navigate to="/login" replace />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;