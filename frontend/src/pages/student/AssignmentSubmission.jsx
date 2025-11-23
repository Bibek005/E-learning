// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function AssignmentSubmission() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const submitAssignment = async () => {
//     if (!file) return alert("Please choose a file!");

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/student/assignments/submit/${id}`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       alert("Assignment submitted successfully!");
//       navigate("/student/assignments");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h1 className="text-xl font-bold mb-4">Submit Assignment</h1>

//       <input
//         type="file"
//         className="border p-2 w-full"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <button
//         onClick={submitAssignment}
//         disabled={loading}
//         className="mt-4 w-full bg-green-600 text-white py-2 rounded"
//       >
//         {loading ? "Submitting..." : "Submit"}
//       </button>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

export default function AssignmentSubmission() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("file", file);

    await api.post(`/student/assignments/submit/${assignmentId}`, form);

    alert("Submitted!");
    navigate("/student/courses");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Submit Assignment</h1>

      <input
        type="file"
        className="border p-2 mt-4 w-full"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 w-full rounded">
        Upload
      </button>
    </div>
  );
}
