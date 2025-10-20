// pages/teacher/ManageCourses.jsx
import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/teacher/courses');
      setCourses(res.data);

      // Fetch enrollments for each course
      const enrollmentPromises = res.data.map(course =>
        axios.get(`/api/teacher/courses/${course.id}/enrollments`)
      );
      const enrollmentResponses = await Promise.all(enrollmentPromises);
      const enrollmentMap = {};
      enrollmentResponses.forEach((response, index) => {
        enrollmentMap[res.data[index].id] = response.data;
      });
      setEnrollments(enrollmentMap);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/courses', formData);
      setShowAddModal(false);
      setFormData({ title: '', description: '' });
      fetchCourses();
    } catch (error) {
      alert("Failed to create course");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/teacher/courses/${id}`);
      fetchCourses();
    } catch (error) {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <main className="p-4 lg:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Courses</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Course</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        // Show enrolled students modal or navigate
                        alert(`Enrolled: ${enrollments[course.id]?.length || 0} students`);
                      }}
                      className="text-blue-600 hover:text-blue-900 underline"
                    >
                      {enrollments[course.id]?.length || 0} students
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Course Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Add New Course</h3>
              <form onSubmit={handleAddCourse}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageCourses;