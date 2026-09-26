import React, { useState } from 'react';
import { supabaseHelpers } from '../config/supabase';
import { validateText, validateEmail } from '../utils/validation';
import { sanitizeInput } from '../utils/sanitization';
import { canExecute } from '../utils/rateLimit';
import { LuCircleCheckBig, LuCircleAlert, LuMail, LuMessageCircle, LuShare2, LuSend } from 'react-icons/lu';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!canExecute('contact-form', 3000)) {
      setError('Please wait before sending another message');
      return;
    }

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };

    if (!validateText(sanitizedData.name, 2, 100)) {
      setError('Name must be between 2 and 100 characters');
      return;
    }

    if (!validateEmail(sanitizedData.email)) {
      setError('Email address is invalid');
      return;
    }

    if (!validateText(sanitizedData.message, 10, 1000)) {
      setError('Message must be between 10 and 1000 characters');
      return;
    }

    try {
      await supabaseHelpers.saveContactSubmission(sanitizedData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('An error occurred while sending your message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 text-slate-900 dark:text-slate-100">
      <SEO
        title="Contact Us"
        description="Get in touch with Tools Platform. Send us your feedback, questions, or suggestions. We'd love to hear from you!"
        keywords="contact, support, feedback, help, tools platform, customer service"
        url="https://platformtools.netlify.app/contact"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-black text-[#001645] dark:text-white mb-4 tracking-tight">
            Contact <span className="text-[#804DF2]">Us</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get in touch with us — we'd love to hear your questions and feedback!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-black text-[#001645] dark:text-white mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                <LuCircleCheckBig size={20} className="text-emerald-600 shrink-0" />
                <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3">
                <LuCircleAlert size={20} className="text-amber-600 shrink-0" />
                <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#804DF2] dark:text-white transition-all text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#804DF2] dark:text-white transition-all text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#804DF2] dark:text-white transition-all text-base resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#804DF2] hover:bg-[#6c3bde] text-white rounded-xl shadow-md transition-all font-bold text-base"
              >
                <LuSend size={18} />
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-black text-[#001645] dark:text-white mb-6">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/60 rounded-xl flex items-center justify-center text-[#804DF2]">
                    <LuMail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">yousseflachgar288@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/60 rounded-xl flex items-center justify-center text-[#804DF2]">
                    <LuMessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Live Chat</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Available Mon-Fri, 9AM-5PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/60 rounded-xl flex items-center justify-center text-[#804DF2]">
                    <LuShare2 size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Social Media</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">@toolsplatform</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-black text-[#001645] dark:text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Are all tools really free?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Yes! All our tools are completely free to use with no hidden costs or subscriptions.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Is my data secure?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Absolutely! All tools execute client-side inside your browser with 100% privacy protection.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Can I use these tools offline?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Once loaded, all client-side tools work offline without requiring an active connection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};

export default Contact;