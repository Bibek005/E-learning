// src/pages/teacher/Submissions.jsx
import { useState, useEffect } from 'react';

const TeacherSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('/api/teacher/submissions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setSubmissions)
      .catch(console.error);
  }, []);

  const handleEvaluate = async (submissionId) => {
    const res = await fetch(`/api/teacher/submissions/${submissionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ grade, feedback }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSubmissions(submissions.map(s => s.id === submissionId ? updated : s));
      setSelectedSubmission(null);
      setGrade('');
      setFeedback('');
    }
  };

  const openEvaluation = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.grade || '');
    setFeedback(submission.feedback || '');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Evaluate Submissions</h1>

      {/* Submission List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">Assignment: {submission.assignment_title}</h3>
            <p className="text-sm text-gray-600">Student: {submission.student_name}</p>
            <p className="text-xs text-gray-500">
              Submitted: {new Date(submission.submitted_at).toLocaleString()}
            </p>
            <p className="text-sm mt-2">
              Status: <span className={`font-medium ${submission.status === 'graded' ? 'text-green-600' : 'text-yellow-600'}`}>
                {submission.status}
              </span>
            </p>
            {submission.grade && (
              <p className="text-sm mt-1">Grade: <strong>{submission.grade}/100</strong></p>
            )}
            {submission.feedback && (
              <p className="text-sm mt-1">Feedback: {submission.feedback}</p>
            )}
            <div className="mt-2">
              <button
                onClick={() => openEvaluation(submission)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
              >
                {submission.status === 'graded' ? 'Re-evaluate' : 'Evaluate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Evaluation Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Evaluate Submission</h2>
            <p><strong>Student:</strong> {selectedSubmission.student_name}</p>
            <p><strong>Assignment:</strong> {selectedSubmission.assignment_title}</p>
            <div className="mt-4">
              <label className="block mb-1">Grade (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-1">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>
            <div className="mt-6 flex space-x-2">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEvaluate(selectedSubmission.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSubmissions;