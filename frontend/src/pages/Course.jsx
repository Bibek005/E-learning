const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SECTION — CONTACT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h1 className="text-4xl font-bold text-indigo-700 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions? We're here to help you regarding courses, enrollment,
            instructors, or technical issues.
          </p>

          <form className="space-y-5">
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Tell us your issue..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition">
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT SECTION — INFO CARD */}
        <div className="bg-indigo-600 text-white p-10 rounded-2xl shadow-xl self-start md:mt-6">
          <h2 className="text-3xl font-semibold mb-6">Other ways to reach us</h2>

          <div className="space-y-5 text-lg">
            <p>📞 <span className="font-bold">Phone:</span> +977 9800000000</p>
            <p>📧 <span className="font-bold">Email:</span> support@elearning.com</p>
            <p>🕒 <span className="font-bold">Working Hours:</span> 9 AM – 6 PM (Sun–Fri)</p>
            <p>📍 <span className="font-bold">Location:</span> Kathmandu, Nepal</p>
          </div>

          {/* Illustration image placed at bottom */}
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/customer-support-illustration-download-in-svg-png-gif-file-formats--call-center-service-communication-pack-business-illustrations-4581768.png"
            alt="students learning"
            className="mt-10 w-64 mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
