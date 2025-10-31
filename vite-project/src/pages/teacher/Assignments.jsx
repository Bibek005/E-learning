// src/pages/teacher/Assignments.jsx
import { useState, useEffect } from 'react';

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    course_id: '',
    title: '',
    description: '',
    due_date: '',
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/teacher/courses', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);

    fetch('/api/teacher/assignments', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setAssignments)
      .catch(console.error);
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newAssignment),
    });
    if (res.ok) {
      const assignment = await res.json();
      setAssignments([...assignments, assignment]);
      setNewAssignment({ course_id: '', title: '', description: '', due_date: '' });
    }
  };

  const handleDeleteAssignment = async (id) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    const res = await fetch(`/api/teacher/assignments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.ok) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Post Assignments</h1>

      {/* Create Assignment Form */}
      <form onSubmit={handleCreateAssignment} className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Assignment</h2>
        <select
          value={newAssignment.course_id}
          onChange={(e) => setNewAssignment({ ...newAssignment, course_id: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Assignment Description"
          value={newAssignment.description}
          onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          rows="3"
        />
        <input
          type="date"
          value={newAssignment.due_date}
          onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Assignment
        </button>
      </form>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{assignment.title}</h3>
            <p className="text-sm text-gray-600">{assignment.description}</p>
            <p className="text-xs text-gray-500">
              Due: {new Date(assignment.due_date).toLocaleDateString()}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => window.location.href = `/teacher/assignments/${assignment.id}/submissions`}
                className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm"
              >
                View Submissions
              </button>
              <button
                onClick={() => handleDeleteAssignment(assignment.id)}
                className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherAssignments;