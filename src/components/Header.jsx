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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Tools Platform Logo"
              className="w-10 h-10 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Tools Platform
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                100% Client-Side Privacy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isToolsOpen || location.pathname.includes('-')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>Tools (40+)</span>
                <LuChevronDown
                  size={15}
                  className={`transform transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isToolsOpen && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 mt-1 w-[680px] p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 grid grid-cols-2 gap-6 animate-fade-in">
                  {categories.map((cat) => {
                    const CatIcon = cat.icon;
                    const catTools = ALL_TOOLS.filter(t => t.category === cat.id).slice(0, 4);
                    return (
                      <div key={cat.id} className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          <CatIcon size={14} className="text-blue-500" />
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
                                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  <ToolIcon size={14} className="text-slate-400" />
                                  <span className="truncate">{t.name}</span>
                                  {t.badge && (
                                    <span className="ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
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

          {/* Right Controls: Dark Mode & Search Anchor */}
          <div className="flex items-center gap-3">
            <Link
              to="/#tools-search"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Search Tools"
            >
              <LuSearch size={18} />
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <LuSun size={18} /> : <LuMoon size={18} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 block mb-2">
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
                    className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800"
                  >
                    <ToolIcon size={14} className="text-blue-500 flex-shrink-0" />
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
