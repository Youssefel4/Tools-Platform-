import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalculator, FaStickyNote, FaExchangeAlt, FaFont, FaLock,
  FaClock, FaPalette, FaCheckSquare, FaQrcode, FaLink, FaFileUpload
} from 'react-icons/fa';
import SEO from '../components/SEO';

const Home = () => {
  const tools = [
    { name: 'Calculator', description: 'Basic and scientific calculator for all your mathematical needs', icon: FaCalculator, href: '/calculator', color: 'bg-blue-500' },
    { name: 'Notes App', description: 'Create, edit, and manage your notes with local storage', icon: FaStickyNote, href: '/notes', color: 'bg-green-500' },
    { name: 'Unit Converter', description: 'Convert between different units of length, weight, and temperature', icon: FaExchangeAlt, href: '/unit-converter', color: 'bg-purple-500' },
    { name: 'Text Counter', description: 'Count words, characters, sentences, and more in your text', icon: FaFont, href: '/text-counter', color: 'bg-yellow-500' },
    { name: 'Password Generator', description: 'Generate secure passwords with customizable options', icon: FaLock, href: '/password-generator', color: 'bg-red-500' },
    { name: 'Countdown Timer', description: 'Set countdown timers for your tasks and activities', icon: FaClock, href: '/countdown-timer', color: 'bg-indigo-500' },
    { name: 'Color Picker', description: 'Pick colors and get HEX and RGB codes', icon: FaPalette, href: '/color-picker', color: 'bg-pink-500' },
    { name: 'To-Do List', description: 'Manage your tasks with a simple to-do list', icon: FaCheckSquare, href: '/todo-list', color: 'bg-teal-500' },
    { name: 'QR Generator', description: 'Create custom QR codes for URLs, text, and more', icon: FaQrcode, href: '/qr-generator', color: 'bg-orange-500' },
    { name: 'URL Shortener', description: 'Create short, memorable links for long URLs', icon: FaLink, href: '/url-shortener', color: 'bg-cyan-500' },
    { name: 'File Converter', description: 'Convert files between different formats', icon: FaFileUpload, href: '/file-converter', color: 'bg-lime-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Home"
        description="Access a variety of useful online tools like Calculator, Color Picker, Unit Converter, and more."
        keywords="online tools, calculator, converter, color picker, productivity"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
            Welcome to Tools Platform
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Discover a comprehensive collection of useful web tools designed to make your daily tasks easier and more efficient. All tools work locally in your browser with no data sent to servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.href}
                className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${tool.color} text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Use Tool →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Tools Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All tools work locally in your browser. No data is sent to any servers.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast & Responsive</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Lightweight and optimized for speed on all devices.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-400 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Free Forever</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All tools are completely free to use with no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
