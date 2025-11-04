// import { useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// const QuizPage = () => {
//   const { quizId } = useParams();
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0); // in seconds
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await fetch(`/api/quizzes/${quizId}`);
//         const data = await response.json();
//         setQuiz(data);
//         setTimeLeft(data.duration * 60); // Convert minutes to seconds
//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers(prev => ({ ...prev, [questionId]: answer }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       await fetch(`/api/quizzes/${quizId}/submit`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ answers }),
//       });
//       alert('Quiz submitted successfully!');
//       navigate(`/student/course/${quiz?.courseId}`);
//     } catch (error) {
//       alert('Error submitting quiz. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!quiz) {
//     return <div className="p-6 text-center">Loading quiz...</div>;
//   }

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
//       <p className="text-gray-600 mb-6">Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}</p>

//       <div className="space-y-6">
//         {quiz.questions.map((q, index) => (
//           <div key={q.id} className="bg-white p-4 rounded-lg shadow">
//             <h3 className="font-medium mb-3">Question {index + 1}: {q.text}</h3>
//             <div className="space-y-2">
//               {q.options.map(option => (
//                 <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`question-${q.id}`}
//                     value={option.id}
//                     onChange={() => handleAnswerChange(q.id, option.id)}
//                     checked={answers[q.id] === option.id}
//                     className="form-radio h-4 w-4 text-blue-600"
//                   />
//                   <span>{option.text}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitting}
//         className={`mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50`}
//       >
//         {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
//       </button>
//     </div>
//   );
// };

// export default QuizPage;

import { useParams } from 'react-router-dom';

export default function QuizPage() {
  const { quizId } = useParams();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz: {quizId}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">This quiz is not available yet.</p>
      </div>
    </div>
  );
}