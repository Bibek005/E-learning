import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time email validation
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors({ ...errors, email: "Enter a valid email" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email before submission
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, email: "Enter a valid email" });
      return;
    }

    console.log("Form Data:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setErrors({ email: "" });
  };

  return (
    <section id="contact" className="bg-gray-50 py-16 px-6 md:px-16 mt-20">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our e-learning courses? Fill out the form below
          and we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 flex flex-col space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">Get in Touch</h3>

          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-800">Email:</strong>{" "}
              support-elearning@gmail.com
            </p>
            <p>
              <strong className="text-gray-800">Phone:</strong> 9812345678
            </p>
            <p>
              <strong className="text-gray-800">Address:</strong> 
              Somewhere
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              🌐
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              💼
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              📘
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
