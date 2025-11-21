// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Landingpage from './pages/Landingpage';

// Admin
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCourses from './pages/admin/ManageCourses';
import Profile from './pages/admin/Profile';

// Teacher
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherCourses from './pages/teacher/Courses';
import TeacherProfile from './pages/teacher/Profile';
import TeacherAssignments from './pages/teacher/Assignments';
import TeacherQuizzes from './pages/teacher/Quizzes';
import TeacherSubmissions from './pages/teacher/Submissions';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import CourseDetail from './pages/student/CourseDetail';
import QuizPage from './pages/student/QuizPage';
import AssignmentSubmission from './pages/student/AssignmentSubmission';
import Assignments from './pages/student/Assignments';
import StudentProfile from './pages/student/StudentProfile';

// Layout Components
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main className="flex-1 pt-16">{children}</main>
  </div>
);

const AuthenticatedLayout = ({ children, user }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <div className="flex flex-1 pt-16">
      <Sidebar userRole={user.role} userName={user.name} />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  </div>
);

function AppContent() {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Landingpage />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          isLoggedIn && user?.role === 'admin' ? (
            <AuthenticatedLayout user={user}>
              <Dashboard />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/users"
        element={
          isLoggedIn && user?.role === 'admin' ? (
            <AuthenticatedLayout user={user}>
              <ManageUsers />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/courses"
        element={
          isLoggedIn && user?.role === 'admin' ? (
            <AuthenticatedLayout user={user}>
              <ManageCourses />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/admin/profile"
        element={
          isLoggedIn && user?.role === 'admin' ? (
            <AuthenticatedLayout user={user}>
              <Profile />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherDashboard />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/courses"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherCourses />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/assignments"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherAssignments />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/quizzes"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherQuizzes />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/submissions"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherSubmissions />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/teacher/profile"
        element={
          isLoggedIn && user?.role === 'teacher' ? (
            <AuthenticatedLayout user={user}>
              <TeacherProfile />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Student Routes — using AuthenticatedLayout like others */}
      <Route
        path="/student/dashboard"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <StudentDashboard />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/student/courses"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <StudentCourses />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/student/course/:courseId"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <CourseDetail />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/student/quiz/:quizId"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <QuizPage />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/student/assignment/:assignmentId"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <AssignmentSubmission />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/student/profile"
        element={
          isLoggedIn && user?.role === 'student' ? (
            <AuthenticatedLayout user={user}>
              <StudentProfile />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all: Redirect unknown routes */}
      <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/teacher/*" element={<Navigate to="/teacher/dashboard" replace />} />
      <Route path="/student/*" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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