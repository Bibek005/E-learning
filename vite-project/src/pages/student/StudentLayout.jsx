import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const StudentLayout = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/api/student/profile'); // Replace with your actual endpoint
        if (!response.ok) throw new Error('Failed to fetch student data');
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav userName={studentData?.name || 'Student'} userRole="student" />
      <div className="flex flex-1 pt-16">
        <Sidebar userRole="student" userName={studentData?.name || 'Student'} />
        <main className="flex-1 p-4 md:p-6 lg:ml-0 xl:ml-64 mt-0">
          <Outlet context={{ studentData }} /> {/* Pass data to children */}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;