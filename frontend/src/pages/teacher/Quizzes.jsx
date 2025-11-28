// src/pages/teacher/Quizzes.jsx
import { useEffect, useState } from 'react';
import { getTeacherCourses, getTeacherQuizzes, createTeacherQuiz, deleteTeacherQuiz } from '../../services/api';

const TeacherQuizzes = () => {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ course_id: '', title: '', time_limit: 10 });
  const [questions, setQuestions] = useState([{ question_text: '', options: ['', '', '', ''], correct_answer: 0 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await getTeacherCourses();
        setCourses(coursesData);
        const quizzesData = await getTeacherQuizzes();
        setQuizzes(quizzesData);
      } catch (err) {
        console.error(err);
        alert('Failed to load quizzes or courses.');
      }
    };
    fetchData();
  }, []);

  const addQuestion = () => setQuestions([...questions, { question_text: '', options: ['', '', '', ''], correct_answer: 0 }]);
  const updateQuestion = (qIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex][field] = value;
    setQuestions(updated);
  };
  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const quiz = await createTeacherQuiz({ ...newQuiz, questions });
      setQuizzes([...quizzes, quiz]);
      setNewQuiz({ course_id: '', title: '', time_limit: 10 });
      setQuestions([{ question_text: '', options: ['', '', '', ''], correct_answer: 0 }]);
    } catch (err) {
      console.error(err);
      alert('Failed to create quiz.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this quiz?')) return;
    try {
      await deleteTeacherQuiz(id);
      setQuizzes(quizzes.filter(q => q.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete quiz.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quizzes</h1>

      <form onSubmit={handleCreateQuiz} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Create New Quiz</h2>
        <select
          value={newQuiz.course_id}
          onChange={e => setNewQuiz({ ...newQuiz, course_id: parseInt(e.target.value) })}

          className="w-full p-2 border rounded mb-2"
          required
        >
          <option value="">Select Course</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <input
          type="text"
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={e => setNewQuiz({...newQuiz, title: e.target.value})}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="number"
          placeholder="Time Limit (minutes)"
          value={newQuiz.time_limit}
          onChange={e => setNewQuiz({...newQuiz, time_limit: parseInt(e.target.value) || 10})}
          className="w-full p-2 border rounded mb-2"
          min={1}
          max={120}
          required
        />

        <h3 className="font-semibold mb-2">Questions</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-3 p-2 bg-gray-50 rounded">
            <input
              type="text"
              placeholder="Question"
              value={q.question_text}
              onChange={e => updateQuestion(qIndex, 'question_text', e.target.value)}
              className="w-full p-2 border rounded mb-1"
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
                  placeholder={`Option ${oIndex+1}`}
                  value={opt}
                  onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                  className="flex-1 p-1 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="mb-2 px-3 py-1 bg-green-100 text-green-800 rounded">Add Question</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Quiz</button>
      </form>

      <div className="space-y-3">
        {quizzes.map(q => (
          <div key={q.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{q.title}</h3>
            <p className="text-gray-600 text-sm">Course: {q.course_title}</p>
            <p className="text-xs text-gray-500">Time Limit: {q.time_limit} mins</p>
            <button
              onClick={() => handleDelete(q.id)}
              className="mt-1 px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherQuizzes;
