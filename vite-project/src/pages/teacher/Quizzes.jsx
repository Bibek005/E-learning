// src/pages/teacher/Quizzes.jsx
import { useState, useEffect } from 'react';

const TeacherQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    course_id: '',
    title: '',
    time_limit: 10, // minutes
  });
  const [questions, setQuestions] = useState([
    { question_text: '', options: ['', '', '', ''], correct_answer: 0 },
  ]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/teacher/courses', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setCourses)
      .catch(console.error);

    fetch('/api/teacher/quizzes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then(setQuizzes)
      .catch(console.error);
  }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question_text: '', options: ['', '', '', ''], correct_answer: 0 },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        ...newQuiz,
        questions: questions.filter(q => q.question_text.trim() !== ''),
      }),
    });
    if (res.ok) {
      const quiz = await res.json();
      setQuizzes([...quizzes, quiz]);
      setNewQuiz({ course_id: '', title: '', time_limit: 10 });
      setQuestions([{ question_text: '', options: ['', '', '', ''], correct_answer: 0 }]);
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    const res = await fetch(`/api/teacher/quizzes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (res.ok) {
      setQuizzes(quizzes.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Quizzes</h1>

      {/* Create Quiz Form */}
      <form onSubmit={handleCreateQuiz} className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Create New Quiz</h2>
        <select
          value={newQuiz.course_id}
          onChange={(e) => setNewQuiz({ ...newQuiz, course_id: e.target.value })}
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
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={newQuiz.time_limit}
          onChange={(e) => setNewQuiz({ ...newQuiz, time_limit: parseInt(e.target.value) || 0 })}
          className="w-full p-2 border rounded mb-4"
          min="1"
          max="120"
          required
        />

        <h3 className="font-semibold mb-2">Questions</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4 p-3 bg-gray-50 rounded">
            <input
              type="text"
              placeholder="Question Text"
              value={q.question_text}
              onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={`correct_${qIndex}`}
                  checked={q.correct_answer === oIndex}
                  onChange={() => updateQuestion(qIndex, 'correct_answer', oIndex)}
                  className="mr-2"
                />
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Quiz
        </button>
      </form>

      {/* Quiz List */}
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold">{quiz.title}</h3>
            <p className="text-sm text-gray-600">Course: {quiz.course_title}</p>
            <p className="text-xs text-gray-500">Time Limit: {quiz.time_limit} mins</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => window.location.href = `/teacher/quizzes/${quiz.id}/attempts`}
                className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm"
              >
                View Attempts
              </button>
              <button
                onClick={() => handleDeleteQuiz(quiz.id)}
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

export default TeacherQuizzes;