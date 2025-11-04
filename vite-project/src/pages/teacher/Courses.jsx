import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ Import API functions
import { getTeacherCourses, createTeacherCourse, deleteTeacherCourse } from '../../services/api';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getTeacherCourses();
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
        alert('Failed to load courses. Please log in again.');
      }
    };
    loadCourses();
  }, []);

  // Create new course
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    setLoading(true);
    try {
      const course = await createTeacherCourse(newCourse);
      setCourses([...courses, course]);
      setNewCourse({ title: '', description: '' });
    } catch (err) {
      console.error('Failed to create course:', err);
      alert('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Edit course
  const handleEditCourse = (id) => {
    navigate(`/teacher/courses/${id}`);
  };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteTeacherCourse(id);
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete course:', err);
      alert('Failed to delete course. It may still have assignments or students.');
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
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="text-gray-500 col-span-full">No courses yet. Create your first course!</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.description || 'No description'}</p>
              <div className="mt-4 flex flex-wrap gap-2">
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
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;