import { Link } from "lucide-react";
import React from "react";
import { FaChalkboardTeacher, FaLaptopCode, FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center md:items-start gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Empowering You to Learn and Grow
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to provide accessible, engaging, and top-quality online learning experiences
            that help learners worldwide build skills, advance their careers, and reach their personal goals.
            We combine expert-led content, interactive exercises, and a supportive community.
          </p>
          <button className="mt-4 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Explore Courses
          </button>
        </div>

        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/src/assets/student.jpg"
            alt="Students collaborating in an online class"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="text-center space-y-10">
        <h2 className="text-4xl font-bold text-gray-900">Our Core Values</h2>

        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center max-w-xs px-6 py-8 bg-indigo-50 rounded-lg shadow-md">
            <FaUsers className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Student First</h3>
            <p className="text-gray-700">
              Designing every experience with the learner’s success as our top priority.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs px-6 py-8 bg-indigo-50 rounded-lg shadow-md">
            <FaChalkboardTeacher className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Instruction</h3>
            <p className="text-gray-700">
              Courses created and taught by passionate professionals and educators.
            </p>
          </div>

          <div className="flex flex-col items-center max-w-xs px-6 py-8 bg-indigo-50 rounded-lg shadow-md">
            <FaLaptopCode className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
            <p className="text-gray-700">
              Regular updates and new features to keep learning effective and exciting.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Jane Doe"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">Jane Doe</h3>
            <p className="text-indigo-600 font-medium mb-2">Lead Instructor</p>
            <p className="text-gray-600 text-sm">Curriculum & course design</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="John Smith"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">John Smith</h3>
            <p className="text-indigo-600 font-medium mb-2">Developer</p>
            <p className="text-gray-600 text-sm">Platform engineering</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/lego/6.jpg"
              alt="Support Team"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-1">Support Team</h3>
            <p className="text-indigo-600 font-medium mb-2">Student Success</p>
            <p className="text-gray-600 text-sm">Always here to help</p>
          </div>
        </div>
      </section>
    </main>
  );
}
