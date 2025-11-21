// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function StudentQuiz() {
//   const [quizzes, setQuizzes] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const loadQuizzes = async () => {
//       const res = await fetch("http://localhost:5000/api/student/quiz", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();
//       setQuizzes(data.quizzes || []);
//     };

//     loadQuizzes();
//   }, [token]);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Available Quizzes</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {quizzes.map((q) => (
//           <div key={q.id} className="border p-4 rounded shadow-sm">
//             <h2 className="font-semibold">{q.title}</h2>
//             <p>Total Questions: {q.total_questions}</p>

//             {q.attempted ? (
//               <p className="text-green-600 mt-2">Already Attempted ✔</p>
//             ) : (
//               <Link
//                 to={`/student/quiz/start/${q.id}`}
//                 className="inline-block mt-3 px-4 py-2 bg-purple-600 text-white rounded"
//               >
//                 Start Quiz
//               </Link>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function StudentQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get("/student/quizzes").then((res) => setQuizzes(res.data.quizzes));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Quizzes</h1>

      {quizzes.map((q) => (
        <div key={q.id} className="p-4 border rounded shadow mt-3">
          <h2 className="font-semibold">{q.title}</h2>
          <p>Total Questions: {q.totalQuestions}</p>

          <Link
            to={`/student/quiz/${q.id}`}
            className="mt-3 inline-block bg-purple-600 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </Link>
        </div>
      ))}
    </div>
  );
}
