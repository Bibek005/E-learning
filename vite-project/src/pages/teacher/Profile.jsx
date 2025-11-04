// src/pages/teacher/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch profile on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    fetch('http://localhost:5000/api/teacher/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          return navigate('/login');
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setFormData({ name: data.name, email: data.email, password: '' });
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        alert('Failed to load profile. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/api/teacher/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
      setIsEditing(false);
      alert('✅ Profile updated!');
    } else {
      alert('❌ Update failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="p-8 text-red-500">Profile not found</div>;

  return (
    <div className="ml-64 p-6 pt-24 bg-gray-50 min-h-screen">
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">👤 Teacher Profile</h1>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password (optional)</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Leave blank to keep current"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg">{profile.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{profile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-lg capitalize">teacher</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Member Since</label>
              <p className="text-lg">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;