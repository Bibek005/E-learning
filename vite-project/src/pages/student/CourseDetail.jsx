// import { useParams, useOutletContext } from 'react-router-dom';
// import { useState } from 'react';

// const CourseDetail = () => {
//   const { courseId } = useParams();
//   const { studentData } = useOutletContext();
//   const course = studentData?.courses.find(c => c.courseId === courseId);

//   if (!course) {
//     return <div className="p-6 text-center text-gray-600">Course not found.</div>;
//   }

//   const [activeTab, setActiveTab] = useState('materials');

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h1>
//       <p className="text-gray-600 mb-6">Instructor: {course.instructor}</p>

//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-6">
//         <nav className="flex space-x-8">
//           <button
//             onClick={() => setActiveTab('materials')}
//             className={`pb-2 font-medium text-sm ${activeTab === 'materials' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//           >
//             Study Materials
//           </button>
//           <button
//             onClick={() => setActiveTab('assignments')}
//             className={`pb-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//           >
//             Assignments ({course.assignments.filter(a => !a.submitted).length})
//           </button>
//           <button
//             onClick={() => setActiveTab('quizzes')}
//             className={`pb-2 font-medium text-sm ${activeTab === 'quizzes' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//           >
//             Quizzes ({course.quizzes.filter(q => !q.attempted).length})
//           </button>
//         </nav>
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'materials' && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold">Resources</h2>
//           {course.resources.map(resource => (
//             <div key={resource.id} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex items-center space-x-3">
//                 {resource.type === 'video' ? (
//                   <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
//                 ) : (
//                   <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"/></svg>
//                 )}
//                 <div className="flex-1">
//                   <h3 className="font-medium">{resource.title}</h3>
//                   <p className="text-sm text-gray-500">{resource.type}</p>
//                 </div>
//                 <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                   View
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === 'assignments' && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold">Assignments</h2>
//           {course.assignments.map(assignment => (
//             <div key={assignment.id} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium">{assignment.title}</h3>
//                   <p className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
//                 </div>
//                 {assignment.submitted ? (
//                   <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Submitted</span>
//                 ) : (
//                   <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
//                     Submit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === 'quizzes' && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold">Quizzes</h2>
//           {course.quizzes.map(quiz => (
//             <div key={quiz.id} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="font-medium">{quiz.title}</h3>
//                   <p className="text-sm text-gray-500">Due: {new Date(quiz.dueDate).toLocaleDateString()}</p>
//                 </div>
//                 {quiz.attempted ? (
//                   <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Attempted</span>
//                 ) : (
//                   <Link
//                     to={`/student/quiz/${quiz.id}`}
//                     className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Take Quiz
//                   </Link>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;

import { useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { courseId } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Course: {courseId}</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Study Materials</h2>
          <p className="text-gray-600">No resources available yet.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-gray-600">No assignments available.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Quizzes</h2>
          <p className="text-gray-600">No quizzes available.</p>
        </div>
      </div>
    </div>
  );
}