// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function QuizPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     const loadQuiz = async () => {
//       const res = await fetch(`http://localhost:5000/api/student/quiz/start/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       setQuiz(data.quiz);
//     };

//     loadQuiz();
//   }, [id, token]);

//   const submitQuiz = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/student/quiz/submit/${id}`,
//         {
//           method: "POST",
//           headers: { 
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}` 
//           },
//           body: JSON.stringify({ answers }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       alert("Quiz submitted!");
//       navigate("/student/quiz");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (!quiz) return <p className="p-6">Loading quiz...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>

//       {quiz.questions.map((q, index) => (
//         <div key={q.id} className="mb-6 border p-4 rounded">
//           <h2 className="font-semibold">
//             {index + 1}. {q.question}
//           </h2>

//           {q.options.map((opt, i) => (
//             <label key={i} className="block mt-2">
//               <input
//                 type="radio"
//                 name={q.id}
//                 value={opt}
//                 onChange={() =>
//                   setAnswers({ ...answers, [q.id]: opt })
//                 }
//               />
//               <span className="ml-2">{opt}</span>
//             </label>
//           ))}
//         </div>
//       ))}

//       <button
//         onClick={submitQuiz}
//         className="w-full bg-blue-600 text-white py-2 rounded"
//       >
//         Submit Quiz
//       </button>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(`/student/quiz/start/${quizId}`).then((res) => {
      setQuiz(res.data.quiz);
    });
  }, [quizId]);

  const submitQuiz = async () => {
    await api.post(`/student/quiz/submit/${quizId}`, { answers });
    alert("Quiz Submitted!");
    navigate("/student/courses");
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>

      {quiz.questions.map((q, i) => (
        <div key={q.id} className="mt-4 border p-4 rounded">
          <h2 className="font-semibold">{i + 1}. {q.question}</h2>

          {q.options.map((opt) => (
            <label key={opt} className="block mt-1">
              <input
                type="radio"
                name={q.id}
                onChange={() => setAnswers({ ...answers, [q.id]: opt })}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={submitQuiz}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded w-full"
      >
        Submit Quiz
      </button>
    </div>
  );
}
