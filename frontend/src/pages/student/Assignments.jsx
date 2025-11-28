<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FaFileAlt, FaCalendar, FaBook, FaClock } from "react-icons/fa";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, submitted

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/student/assignments");
      console.log("Assignments:", data);
      setAssignments(data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const getDaysLeft = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusColor = (daysLeft) => {
    if (daysLeft < 0) return "text-red-600 bg-red-50";
    if (daysLeft < 3) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  const getStatusText = (daysLeft) => {
    if (daysLeft < 0) return `Overdue by ${Math.abs(daysLeft)} days`;
    if (daysLeft === 0) return "Due today!";
    return `${daysLeft} days left`;
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin">⚙️</div>
        <p className="mt-2 text-gray-600">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-semibold">❌ {error}</p>
        <button
          onClick={fetchAssignments}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📝 My Assignments</h1>
        <p className="text-gray-600 mt-1">
          {assignments.length} total assignments
        </p>
      </div>

      {/* Empty State */}
      {assignments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaFileAlt className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No assignments yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((a) => {
            const daysLeft = getDaysLeft(a.due_date);
            const statusColor = getStatusColor(daysLeft);
            const statusText = getStatusText(daysLeft);

            return (
              <div
                key={a.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Course Tag */}
                <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <p className="text-sm text-blue-700 font-semibold flex items-center gap-2">
                    <FaBook size={14} />
                    {a.course_title}
                  </p>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                    {a.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {a.description || "No description provided"}
                  </p>

                  {/* Due Date */}
                  <div className="flex items-center gap-2 text-gray-700 mb-3 text-sm">
                    <FaCalendar className="text-red-500" />
                    <span>
                      {new Date(a.due_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Days Left Status */}
                  <div
                    className={`${statusColor} px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2 mb-4`}
                  >
                    <FaClock size={14} />
                    {statusText}
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-5 pb-5">
                  <Link
                    to={`/student/assignments/${a.id}`}
                    className="w-full block text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Assignment
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
>>>>>>> b1303d1fe1895168c6ba5aeb1db09de4cc8c41d0
    </div>
  );
}
