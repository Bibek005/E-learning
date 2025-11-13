import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AssignmentSubmission = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [submissionText, setSubmissionText] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('text', submissionText);
    if (file) formData.append('file', file);

    try {
      await fetch(`/api/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: formData,
      });
      alert('Assignment submitted successfully!');
      navigate(-1); // Go back to course page
    } catch (error) {
      alert('Error submitting assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Text Submission</label>
          <textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={6}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your answer here..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload File (optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
