import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaCalculator, FaStickyNote, FaExchangeAlt, FaFont, FaLock,
  FaClock, FaPalette, FaCheckSquare, FaQrcode, FaFileUpload,
  FaHome, FaInfoCircle, FaEnvelope, FaUserSecret, FaFileContract, FaImage, FaGamepad
} from 'react-icons/fa';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfoCircle },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
    { name: 'Privacy', href: '/privacy', icon: FaUserSecret },
    { name: 'Terms', href: '/terms', icon: FaFileContract },
  ];

  const tools = [
    { name: 'Calculator', href: '/calculator', icon: FaCalculator },
    { name: 'Notes', href: '/notes', icon: FaStickyNote },
    { name: 'Unit Converter', href: '/unit-converter', icon: FaExchangeAlt },
    { name: 'Text Counter', href: '/text-counter', icon: FaFont },
    { name: 'Password Generator', href: '/password-generator', icon: FaLock },
    { name: 'Countdown Timer', href: '/countdown-timer', icon: FaClock },
    { name: 'Color Picker', href: '/color-picker', icon: FaPalette },
    { name: 'To-Do List', href: '/todo-list', icon: FaCheckSquare },
    { name: 'QR Generator', href: '/qr-generator', icon: FaQrcode },
    { name: 'Image Resizer', href: '/image-resizer', icon: FaImage },
    { name: 'File Converter', href: '/file-converter', icon: FaFileUpload },
    { name: 'Mini Games', href: '/mini-games', icon: FaGamepad },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
              T
            </div>
            <h1 className="text-2xl font-extrabold text-gradient">Tools Platform</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.href)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                  }`}
              >
                <item.icon className="mr-2" size={16} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Tools + Dark Mode */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-1">
                Tools <span className="text-xs">▼</span>
              </button>
              <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:scale-100 scale-95 z-50">
                <div className="py-1">
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        <Icon className="mr-2" size={16} />
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-md text-base font-medium min-h-[44px] ${isActive(item.href)
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="mr-3" size={18} />
                {item.name}
              </Link>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="px-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Tools
              </p>
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.name}
                    to={tool.href}
                    className="flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="mr-3" size={18} />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
