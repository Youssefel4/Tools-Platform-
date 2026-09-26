import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LuSun, LuMoon, LuMenu, LuX, LuChevronDown, LuSearch, LuBookOpen,
  LuCalculator, LuArrowLeftRight, LuType, LuCode, LuTimer, LuImage
} from 'react-icons/lu';
import { ALL_TOOLS } from '../data/toolsRegistry';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog & Guides', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const categories = [
    { id: 'calculators', name: 'Calculators', icon: LuCalculator },
    { id: 'converters', name: 'Converters', icon: LuArrowLeftRight },
    { id: 'text', name: 'Text Tools', icon: LuType },
    { id: 'developer', name: 'Developer Tools', icon: LuCode },
    { id: 'timers', name: 'Timers & Productivity', icon: LuTimer },
    { id: 'media', name: 'Media & Design', icon: LuImage }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#804DF2] text-white shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" title="Tools Platform">
            <img
              src="/logo (2).png"
              alt="Tools Platform"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? 'bg-white text-[#804DF2] px-4 py-1.5 rounded-full shadow-sm'
                    : 'text-white/90 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-full'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Tools Mega-Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isToolsOpen || location.pathname.includes('-')
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Tools (40+)</span>
                <LuChevronDown
                  size={15}
                  className={`transform transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-2 w-[680px] p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 grid grid-cols-2 gap-6 animate-fade-in text-slate-800 dark:text-slate-100">
                  {categories.map((cat) => {
                    const CatIcon = cat.icon;
                    const catTools = ALL_TOOLS.filter(t => t.category === cat.id).slice(0, 4);
                    return (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#804DF2] dark:text-[#a782f7] border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          <CatIcon size={14} className="text-[#804DF2]" />
                          <span>{cat.name}</span>
                        </div>
                        <ul className="space-y-1">
                          {catTools.map(t => {
                            const ToolIcon = t.icon;
                            return (
                              <li key={t.id}>
                                <Link
                                  to={t.href}
                                  onClick={() => setIsToolsOpen(false)}
                                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-[#804DF2] dark:hover:text-[#a782f7] transition-colors"
                                >
                                  <ToolIcon size={14} className="text-slate-400" />
                                  <span className="truncate">{t.name}</span>
                                  {t.badge && (
                                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950/60 text-[#804DF2]">
                                      {t.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls: Search & Toggle Switch (exact match to mockup) */}
          <div className="flex items-center gap-3">
            <Link
              to="/#tools-search"
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              title="Search Tools"
              aria-label="Search Tools"
            >
              <LuSearch size={21} className="stroke-[2.2]" />
            </Link>

            {/* Pill Toggle Switch as seen in design */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 rounded-full bg-white/25 hover:bg-white/35 border border-white/50 p-0.5 transition-all flex items-center cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark mode"
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center text-[10px] ${
                  darkMode ? 'translate-x-6 text-[#001645]' : 'translate-x-0 text-[#804DF2]'
                }`}
              >
                {darkMode ? <LuMoon size={11} /> : <LuSun size={11} />}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#804DF2] px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? 'bg-white text-[#804DF2]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/15 pt-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70 px-4 block mb-2">
              Popular Tools
            </span>
            <div className="grid grid-cols-2 gap-1 px-2">
              {ALL_TOOLS.slice(0, 10).map((t) => {
                const ToolIcon = t.icon;
                return (
                  <Link
                    key={t.id}
                    to={t.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-white hover:bg-white/10"
                  >
                    <ToolIcon size={14} className="text-white/80 flex-shrink-0" />
                    <span className="truncate">{t.name}</span>
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
