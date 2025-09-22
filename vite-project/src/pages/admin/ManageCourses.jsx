// pages/admin/ManageCourses.jsx
import { useState, useEffect } from 'react';
import { getAdminCourses, deleteAdminCourse } from '../../services/api';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAdminCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
  try {
    const data = await getAdminCourses();
    setCourses(data);
  } catch (error) {
    console.error("Failed to fetch courses:", error); // 👈 This will show 500 error details
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteAdminCourse(courseId);
      alert("Course deleted successfully!");
      // Refresh list
      const updatedCourses = await getAdminCourses();
      setCourses(updatedCourses);
    } catch (error) {
      alert("Failed to delete course: " + error.message);
    }
  };

  const handleEdit = (course) => {
    // For now, show alert — you can replace with modal or redirect to edit page
    alert(`Edit course: ${course.title}`);
  };

  if (loading) {
    return (
      <div className="ml-64 p-6 pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6 pt-24 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Courses</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{course.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.teacher_name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.enrollments || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      course.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;