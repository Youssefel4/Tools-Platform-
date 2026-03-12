import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel relative mt-auto border-t-0">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gradient mb-4">
              Tools Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              A comprehensive platform of useful web tools designed to make your daily tasks easier and more efficient. Experience premium tools locally and completely free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2 text-blue-500 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2 text-blue-500 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">→</span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2 text-blue-500 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center">
                  <span className="mr-2 text-blue-500 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0">→</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Popular Tools
            </h4>
            <ul className="space-y-3 flex flex-wrap gap-2">
              <li className="w-full">
                <Link to="/calculator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Calculator
                </Link>
              </li>
              <li className="w-full">
                <Link to="/unit-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Unit Converter
                </Link>
              </li>
              <li className="w-full">
                <Link to="/password-generator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Password Generator
                </Link>
              </li>
              <li className="w-full">
                <Link to="/qr-generator" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  QR Generator
                </Link>
              </li>
              <li className="w-full">
                <Link to="/image-resizer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Image Resizer
                </Link>
              </li>
              <li className="w-full">
                <Link to="/file-converter" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  File Converter
                </Link>
              </li>
              <li className="w-full">
                <Link to="/mini-games" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Mini Games
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} Tools Platform. All rights reserved. Built with precision and privacy in mind.
            </p>
            <div className="mt-4 md:mt-0">
              <ins className="adsbygoogle"
                   style={{ display: 'inline-block', width: '728px', height: '90px' }}
                   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                   data-ad-slot="XXXXXXXXXX"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
