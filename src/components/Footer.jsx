import React from 'react';
import { Link } from 'react-router-dom';
import { LuShieldCheck, LuZap, LuLock } from 'react-icons/lu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Tools Platform"
                className="w-10 h-10 rounded-xl shadow-sm object-cover"
              />
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Tools Platform
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              A comprehensive suite of free, high-speed web utilities. Run calculations, text conversions, and developer diagnostics locally in your browser with zero data tracking.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1">
                <LuShieldCheck className="text-emerald-500" size={15} /> 100% Client Privacy
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <LuZap className="text-amber-500" size={15} /> Zero Server Lag
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <LuLock className="text-blue-500" size={15} /> No Sign-Up
              </span>
            </div>
          </div>

          {/* Calculators Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Calculators
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/tools/percentage-calculator" className="hover:text-blue-600 transition-colors">Percentage Calculator</Link></li>
              <li><Link to="/tools/bmi-calculator" className="hover:text-blue-600 transition-colors">BMI Calculator</Link></li>
              <li><Link to="/tools/mortgage-calculator" className="hover:text-blue-600 transition-colors">Mortgage Calculator</Link></li>
              <li><Link to="/tools/calorie-calculator" className="hover:text-blue-600 transition-colors">Calorie & BMR Calc</Link></li>
              <li><Link to="/tools/compound-interest-calculator" className="hover:text-blue-600 transition-colors">Compound Interest</Link></li>
              <li><Link to="/tools/age-calculator" className="hover:text-blue-600 transition-colors">Age Calculator</Link></li>
            </ul>
          </div>

          {/* Converters & Text Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Converters & Dev
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/tools/unit-converter" className="hover:text-blue-600 transition-colors">Universal Unit Converter</Link></li>
              <li><Link to="/tools/password-generator" className="hover:text-blue-600 transition-colors">Password Generator</Link></li>
              <li><Link to="/tools/qr-generator" className="hover:text-blue-600 transition-colors">QR Code Generator</Link></li>
              <li><Link to="/tools/image-resizer" className="hover:text-blue-600 transition-colors">Image Resizer</Link></li>
              <li><Link to="/tools/image-compressor" className="hover:text-blue-600 transition-colors">Image Compressor</Link></li>
              <li><Link to="/tools/csv-json-converter" className="hover:text-blue-600 transition-colors">CSV to JSON</Link></li>
            </ul>
          </div>

          {/* Resources & Guides Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Knowledge & Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors font-semibold text-blue-600 dark:text-blue-400">Blog & Tutorials</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Tools Platform. All rights reserved. Precision web utilities engineered with privacy.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/contact" className="hover:underline">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
