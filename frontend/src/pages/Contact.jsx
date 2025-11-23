import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ sending: false, success: null, message: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'A valid email is required.';
    if (!form.message.trim()) return 'Message cannot be empty.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus({ sending: false, success: false, message: validationError });
      return;
    }

    setStatus({ sending: true, success: null, message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      setStatus({ sending: false, success: true, message: data.message || 'Message sent successfully.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ sending: false, success: false, message: 'Failed to send message. Please try again later.' });
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold   mb-2 text-gray-900">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        If you have questions or feedback, please send us a message and we’ll get back to you.
      </p>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:min-h-[550px] items-center">

        {/* LEFT SIDE — CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Your full name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              placeholder="Write your message here..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={status.sending}
            className={`w-full py-3 rounded-md text-white font-semibold transition-colors ${
              status.sending ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {status.sending ? 'Sending…' : 'Send Message'}
          </button>

          {status.message && (
            <p
              className={`mt-4 text-center font-medium ${
                status.success ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
{/* RIGHT SIDE — INFO CARD */}
<div className="bg-indigo-50 p-8 rounded-xl shadow-md border mt-20 h-fit self-start">

  <h2 className="text-3xl font-semibold text-indigo-900 mb-4">
    Other ways to reach us
  </h2>

  <ul className="space-y-3 text-indigo-800">
    <li>
      Email:{' '}
      <a href="mailto:support@example.com" className="underline hover:text-indigo-600">
        support@example.com
      </a>
    </li>
    <li>
      Phone:{' '}
      <a href="tel:+10000000000" className="underline hover:text-indigo-600">
        +1 (000) 000-0000
      </a>
    </li>
  </ul>
</div>

      </div>
    </main>
  );
}
