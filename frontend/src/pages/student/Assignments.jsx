// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Assignments() {
//   const { user } = useAuth();
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/assignments", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();
//         setAssignments(data.assignments || []);
//       } catch (err) {
//         console.error("Error loading assignments:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, [token]);

//   if (loading) return <p className="text-center mt-6">Loading assignments...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Your Assignments</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {assignments.map((a) => (
//           <div key={a.id} className="border p-4 rounded shadow-sm">
//             <h2 className="font-semibold">{a.title}</h2>
//             <p className="text-sm text-gray-600">{a.description}</p>
//             <p className="mt-2">Deadline: {a.deadline?.split("T")[0]}</p>

//             {a.submitted ? (
//               <p className="mt-2 text-green-600 font-semibold">Already submitted ✔</p>
//             ) : (
//               <Link
//                 to={`/student/assignments/submit/${a.id}`}
//                 className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Submit Assignment
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

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    api.get("/student/assignments").then((res) => {
      setAssignments(res.data.assignments);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Assignments</h1>

      {assignments.map((a) => (
        <div key={a.id} className="border p-4 mt-3 rounded shadow-sm">
          <h2 className="font-semibold">{a.title}</h2>
          <p>{a.description}</p>

          <Link
            to={`/student/assignment/${a.id}`}
            className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Assignment
          </Link>
        </div>
      ))}
    </div>
  );
}
