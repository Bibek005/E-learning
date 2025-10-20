// pages/teacher/ManageAssignments.jsx
import { useState, useEffect } from 'react';
import axios from '../../services/api';
import { PlusIcon } from '@heroicons/react/24/outline';

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({});
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    description: '',
    due_date: '',
  });

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('/api/teacher/assignments');
      setAssignments(res.data);

      // Fetch submissions for each assignment
      const submissionPromises = res.data.map(assignment =>
        axios.get(`/api/teacher/assignments/${assignment.id}/submissions`)
      );
      const submissionResponses = await Promise.all(submissionPromises);
      const submissionMap = {};
      submissionResponses.forEach((response, index) => {
        submissionMap[res.data[index].id] = response.data;
      });
      setSubmissions(submissionMap);
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/teacher/courses');
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/assignments', formData);
      setShowAddModal(false);
      setFormData({ course_id: '', title: '', description: '', due_date: '' });
      fetchAssignments();
    } catch (error) {
      alert("Failed to create assignment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <main className="p-4 lg:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Assignments</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Assignment</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{assignment.course_title}</td>
                  <td className="px-6 py-4">{new Date(assignment.due_date).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        alert(`${submissions[assignment.id]?.length || 0} submissions`);
                      }}
                      className="text-blue-600 hover:text-blue-900 underline"
                    >
                      {submissions[assignment.id]?.length || 0} submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Assignment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Add New Assignment</h3>
              <form onSubmit={handleAddAssignment}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Course</label>
                  <select
                    value={formData.course_id}
                    onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
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
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                  <input
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
                    Create Assignment
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

export default ManageAssignments;