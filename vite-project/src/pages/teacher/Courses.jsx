// src/pages/teacher/Courses.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/teacher/courses', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newCourse),
    });
    if (res.ok) {
      const course = await res.json();
      setCourses([...courses, course]);
      setNewCourse({ title: '', description: '' });
    }
  };

  const handleEditCourse = (id) => {
    navigate(`/teacher/courses/${id}`);
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    const res = await fetch(`/api/teacher/courses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.ok) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {/* Create Course Form */}
      <form onSubmit={handleCreateCourse} className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Course</h2>
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          rows="3"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{course.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{course.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEditCourse(course.id)}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/teacher/courses/${course.id}/materials`)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm"
              >
                Materials
              </button>
              <button
                onClick={() => navigate(`/teacher/courses/${course.id}/assignments`)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
              >
                Assignments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;