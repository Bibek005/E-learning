// import { useOutletContext } from 'react-router-dom';

// const StudentDashboard = () => {
//   const { studentData } = useOutletContext(); // Get real data from layout
//   const courses = studentData?.courses || [];

//   // Calculate stats
//   const totalCourses = courses.length;
//   const avgProgress = totalCourses > 0 
//     ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses) 
//     : 0;

//   const upcomingAssignments = courses.flatMap(course =>
//     course.assignments.filter(a => !a.submitted && new Date(a.dueDate) > new Date())
//   ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

//   const upcomingQuizzes = courses.flatMap(course =>
//     course.quizzes.filter(q => !q.attempted && new Date(q.dueDate) > new Date())
//   ).sort((q, r) => new Date(q.dueDate) - new Date(r.dueDate));

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm">Enrolled Courses</h3>
//           <p className="text-2xl font-bold">{totalCourses}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm">Avg. Progress</h3>
//           <p className="text-2xl font-bold">{avgProgress}%</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm">Upcoming Deadlines</h3>
//           <p className="text-2xl font-bold">{upcomingAssignments.length + upcomingQuizzes.length}</p>
//         </div>
//       </div>

//       {/* My Courses */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">My Courses</h2>
//         <div className="space-y-3">
//           {courses.map(course => (
//             <div key={course.courseId} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">{course.title}</h3>
//                 <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
//               </div>
//               <div className="w-32">
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-blue-600 h-2 rounded-full"
//                     style={{ width: `${course.progress}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-xs text-gray-600">{course.progress}%</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Upcoming Tasks */}
//       <section>
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">Upcoming</h2>
//         <div className="space-y-2">
//           {upcomingAssignments.slice(0, 2).map(assign => (
//             <div key={assign.id} className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
//               <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded mr-2">
//                 Assignment
//               </span>
//               <span>{assign.title}</span> • <span className="text-gray-600 text-sm">Due: {new Date(assign.dueDate).toLocaleDateString()}</span>
//             </div>
//           ))}
//           {upcomingQuizzes.slice(0, 2).map(quiz => (
//             <div key={quiz.id} className="bg-green-50 p-3 rounded border-l-4 border-green-500">
//               <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded mr-2">
//                 Quiz
//               </span>
//               <span>{quiz.title}</span> • <span className="text-gray-600 text-sm">Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default StudentDashboard;


export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Dashboard</h1>
      <p className="text-gray-600">Welcome! Here you can track your courses, assignments, and progress.</p>
    </div>
  );
}