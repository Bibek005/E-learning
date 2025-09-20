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

// Teacher Pages (import them)
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherManageCourses from './pages/teacher/ManageCourses';
import TeacherManageAssignments from './pages/teacher/ManageAssignments';
import TeacherManageQuizzes from './pages/teacher/ManageQuizzes';
import TeacherProfile from './pages/teacher/Profile';

function AppContent() {
  const { user, isLoggedIn, loading } = useAuth();

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
            <Route path="/teacher/courses" element={<TeacherManageCourses />} />
            <Route path="/teacher/assignments" element={<TeacherManageAssignments />} />
            <Route path="/teacher/quizzes" element={<TeacherManageQuizzes />} />
            <Route path="/teacher/profile" element={<TeacherProfile user={user} />} />
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