// components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = ({ userRole, userName }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1030;
  const isDesktop = windowWidth >= 1030;

  // Hide sidebar completely on mobile if desired
  if (isMobile) {
    return null;
  }

  const getLinks = () => {
    switch (userRole) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
          { name: 'Manage Users', path: '/admin/users', icon: UsersIcon },
          { name: 'Manage Courses', path: '/admin/courses', icon: BookOpenIcon },
          { name: 'Profile', path: '/admin/profile', icon: UserIcon },
          { name: 'Logout', path: '/logout', icon: ArrowLeftOnRectangleIcon },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', path: '/teacher/dashboard', icon: HomeIcon },
          { name: 'My Courses', path: '/teacher/courses', icon: BookOpenIcon },
          { name: 'Profile', path: '/teacher/profile', icon: UserIcon },
          { name: 'Logout', path: '/logout', icon: ArrowLeftOnRectangleIcon },
        ];
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard', icon: HomeIcon },
          { name: 'My Courses', path: '/student/courses', icon: BookOpenIcon },
          { name: 'Profile', path: '/student/profile', icon: UserIcon },
          { name: 'Logout', path: '/logout', icon: ArrowLeftOnRectangleIcon },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const isActive = (path) => location.pathname === path;

  // Render as Bottom Bar on Tablet
  if (isTablet) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 z-10 
        shadow-lg border-t border-gray-700 backdrop-blur-sm grid grid-cols-5 gap-1"
        style={{
          background: 'linear-gradient(135deg, #1e293b, #1e40af)',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center space-y-1 py-2 px-1 rounded transition
                ${isActive(link.path)
                  ? 'text-blue-300 bg-gray-800 bg-opacity-50'
                  : 'text-gray-300 hover:text-white'
                }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{link.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Render as Left Sidebar on Desktop
  if (isDesktop) {
    return (
      <div
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-900 text-white p-4 z-20 
          shadow-lg border-r border-gray-700 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, #1e293b, #1e40af)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold">Hello, {userName}</h2>
          <p className="text-sm text-gray-300 capitalize">{userRole} Panel</p>
        </div>
        <nav className="space-y-2 overflow-y-auto h-full">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition 
                  ${isActive(link.path)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    );
  }

  return null;
};

// Heroicons (unchanged)
const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const ArrowLeftOnRectangleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
);

export default Sidebar;