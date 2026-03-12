import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalculator, FaStickyNote, FaExchangeAlt, FaFont, FaLock,
  FaClock, FaPalette, FaCheckSquare, FaQrcode, FaFileUpload, FaImage
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
    { name: 'Image Resizer', description: 'Resize images locally with no quality loss', icon: FaImage, href: '/image-resizer', color: 'bg-cyan-500' },
    { name: 'File Converter', description: 'Convert files between different formats', icon: FaFileUpload, href: '/file-converter', color: 'bg-lime-500' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Tools Platform",
    "description": "A comprehensive collection of free online tools including calculator, unit converter, color picker, QR generator, image resizer, and more.",
    "url": "https://platformtools.netlify.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "featureList": [
      "Free Online Calculator",
      "Unit Converter",
      "Color Picker",
      "QR Code Generator",
      "Image Resizer",
      "Password Generator",
      "Text Counter",
      "Notes App",
      "Todo List",
      "Countdown Timer",
      "File Converter"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title="Home"
        description="Free online tools platform with calculator, unit converter, color picker, QR generator, image resizer, password generator, and more. All tools work locally in your browser with complete privacy."
        keywords="free online tools, calculator, unit converter, color picker, QR code generator, image resizer, password generator, text counter, notes app, todo list, countdown timer, file converter, web utilities, productivity tools"
        structuredData={structuredData}
      />
      <div className="relative overflow-hidden mb-16 py-20 lg:py-32">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-50 dark:from-gray-800 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Supercharge your workflow with <br className="hidden md:block"/>
              <span className="text-gradient">Tools Platform</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light">
              Discover a premium collection of beautifully designed web utilities. Run everything locally in your browser with absolute zero data tracking.
            </p>
            <div className="flex justify-center gap-4">
               <a href="#tools" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1">
                 Explore Tools
               </a>
            </div>
          </div>
        </div>
      </div>

      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative z-20">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.name}
                to={tool.href}
                className="group block glass rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm border border-gray-100 dark:border-gray-700 text-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className={tool.color.replace('bg-', 'text-')}>
                      <Icon size={28} className="drop-shadow-sm" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Get Started
                  </span>
                  <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 text-blue-600 dark:text-blue-400 font-bold">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="glass-panel rounded-3xl p-10 md:p-14 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 relative z-10">
            Why Choose <span className="text-gradient">Our Platform?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-blue-600 dark:text-blue-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-blue-500/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Absolute Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every calculation and conversion happens locally inside your browser. Your data never leaves your device.
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl text-green-600 dark:text-green-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-green-500/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Zero server lag. Our tools are optimized for instantaneous results no matter what device you're on.
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-2xl text-purple-600 dark:text-purple-300 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-purple-500/20">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Premium & Free</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enjoy a stunning, modern interface with zero hidden costs. Productivity shouldn't have a price tag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
