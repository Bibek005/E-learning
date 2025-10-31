// src/pages/teacher/Profile.jsx
import { useState, useEffect } from 'react';

const TeacherProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    fetch('/api/teacher/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <form onSubmit={handleUpdateProfile} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password (leave blank to keep current)</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default TeacherProfile;