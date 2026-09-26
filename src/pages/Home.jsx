import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LuSearch, LuArrowRight, LuShieldCheck, LuZap, LuSmartphone,
  LuSparkles, LuX, LuBookOpen, LuChevronDown, LuFolderTree
} from 'react-icons/lu';
import SEO from '../components/SEO';
import { ALL_TOOLS, TOOL_CATEGORIES } from '../data/toolsRegistry';
import { BLOG_POSTS } from '../data/blogPosts';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const searchInputRef = useRef(null);

  // Keyboard shortcut: Press '/' to focus search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools based on search query & category
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_TOOLS.filter(tool => {
      const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
      const matchesQuery = !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.keywords && tool.keywords.some(k => k.toLowerCase().includes(q)));
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const popularTools = useMemo(() => {
    return ALL_TOOLS.filter(t => t.isPopular).slice(0, 6);
  }, []);

  const homeFaqs = [
    {
      question: "Are all tools on Tools Platform completely free to use?",
      answer: "Yes, 100% free with zero hidden paywalls, subscriptions, or sign-up requirements. You can access every calculator, converter, and developer utility anytime."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. All processing, calculations, and conversions happen locally inside your web browser via HTML5 Canvas, Web Crypto, and JavaScript engines. No files or private inputs are ever sent to remote servers."
    },
    {
      question: "Can I use these tools on my smartphone or tablet?",
      answer: "Yes! The platform is fully responsive and touch-optimized for iPhones, Android smartphones, iPads, tablets, laptops, and desktops."
    },
    {
      question: "Do tools work offline?",
      answer: "Once the website is loaded in your browser cache, the vast majority of our client-side tools continue to function without an active internet connection."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Tools Platform",
    "description": "Free, lightning-fast, and privacy-first online web tools for everyday calculations, conversions, and developer tasks.",
    "url": "https://platformtools.netlify.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-[#804DF2] selection:text-white">
      <SEO
        title="Free Online Tools for Everyday Tasks"
        description="50+ free, fast, and private online tools: calculators, converters, image resizer, QR generator, and developer utilities. 100% free and browser-based."
        keywords="free online tools, calculators, unit converter, password generator, qr code generator, image resizer, developer utilities"
        structuredData={structuredData}
        faqs={homeFaqs}
      />

      {/* Hero Section matching user mockup */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-18">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Graphic Sticker from user upload */}
          <div className="flex justify-center mb-5">
            <img
              src="/free online tools for everyday.png"
              alt="Free Online Tools for Everyday Tasks"
              className="w-56 sm:w-72 md:w-80 h-auto object-contain select-none"
            />
          </div>

          {/* Clean Solid Dual-Color Heading - NO gradients */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-5">
            <span className="text-[#001645] dark:text-white">Free Online Tools for</span>
            <br />
            <span className="text-[#804DF2]">Everyday Tasks</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Simple, fast, and privacy-first web utilities. No registration, no downloads, no ads clutter. Just open in your browser and get things done.
          </p>

          {/* Centered Pill Search Input matching mockup */}
          <div id="tools-search" className="max-w-xl mx-auto relative mb-8">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for +40 tools free..."
              className="w-full px-6 py-3.5 rounded-full border-2 border-[#804DF2] bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base shadow-sm outline-none placeholder:text-[#804DF2]/60 focus:ring-4 focus:ring-[#804DF2]/15 transition-all text-center sm:text-left sm:pl-7"
            />
          </div>

          {/* Quick Category Filter Pills in 2 rows as seen in mockup */}
          <div className="flex flex-col items-center gap-2.5 max-w-3xl mx-auto">
            {/* Row 1: All Tools, Calculators, Converters, Text & Writing, Developer Tools */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {['all', 'calculators', 'converters', 'text', 'developer'].map(catId => {
                const cat = TOOL_CATEGORIES.find(c => c.id === catId);
                if (!cat) return null;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#001645] text-white border-2 border-[#001645] shadow-sm'
                        : 'border-2 border-[#804DF2] text-[#804DF2] bg-white dark:bg-slate-900 hover:bg-[#804DF2]/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Media & Design, Timers & Productivity */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {['media', 'timers'].map(catId => {
                const cat = TOOL_CATEGORIES.find(c => c.id === catId);
                if (!cat) return null;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#001645] text-white border-2 border-[#001645] shadow-sm'
                        : 'border-2 border-[#804DF2] text-[#804DF2] bg-white dark:bg-slate-900 hover:bg-[#804DF2]/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section (Only shown when not actively searching) */}
      {!searchQuery && activeCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#001645] dark:text-white">
                Popular & Trending Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Most frequented tools by our community today
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map(tool => {
              const ToolIcon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.href}
                  className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#804DF2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#804DF2] text-white flex items-center justify-center shadow-sm">
                        <ToolIcon size={24} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-[#804DF2] dark:bg-purple-950/60 dark:text-[#a782f7]">
                        {tool.badge || 'Popular'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7] transition-colors mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#804DF2] dark:text-[#a782f7]">
                    <span>Open Tool</span>
                    <LuArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Tools Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {searchQuery ? `Search Results (${filteredTools.length})` : 'All Available Web Tools'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Click on any tool to launch immediately without delay
            </p>
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
              No tools matched your search "{searchQuery}".
            </p>
            <p className="text-sm text-slate-500">
              Try searching for something else like "calculator", "password", "image", or "time".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#804DF2] hover:bg-[#6c3bde] text-white font-semibold text-xs transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => {
              const ToolIcon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.href}
                  className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#804DF2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center shadow-sm">
                        <ToolIcon size={20} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7]">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7] transition-colors mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7]">
                    <span>Get Started</span>
                    <LuArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Category Directory & Internal Linking Hub (Crucial for Googlebot Crawling & Indexation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900 text-[#804DF2] dark:text-[#a782f7] text-xs font-bold mb-3">
            <LuFolderTree size={14} className="text-[#804DF2]" />
            <span>Structured Tool Directory</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#001645] dark:text-white tracking-tight">
            Browse All Tools by Category
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Direct crawlable access to every single tool, calculator, and converter on Tools Platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOL_CATEGORIES.filter(c => c.id !== 'all').map(category => {
            const CatIcon = category.icon;
            const categoryTools = ALL_TOOLS.filter(t => t.category === category.id);
            return (
              <div
                key={category.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#804DF2]/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center">
                      <CatIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {category.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {categoryTools.length} free web tools
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {categoryTools.map(tool => (
                      <li key={tool.id}>
                        <Link
                          to={tool.href}
                          className="group/item flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#804DF2] dark:hover:text-[#a782f7] py-1 transition-colors"
                        >
                          <span className="truncate pr-2">{tool.name}</span>
                          <LuArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-1 transition-all text-[#804DF2] flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    onClick={() => { setActiveCategory(category.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    className="text-xs font-bold text-[#804DF2] dark:text-[#a782f7] hover:underline flex items-center gap-1"
                  >
                    Filter by {category.name} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Educational Blog Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#804DF2] dark:text-[#a782f7]">
                Knowledge Base & Best Practices
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#001645] dark:text-white mt-1">
                Featured Guides & Tutorials
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#804DF2] hover:bg-[#6c3bde] text-white text-xs font-bold transition-all shadow-sm"
            >
              View All Articles <LuArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-[#804DF2] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#804DF2] dark:text-[#a782f7] block mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#804DF2] dark:text-[#a782f7] flex items-center gap-1">
                  Read Guide <LuArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Platform Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
            Why Choose Tools Platform?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered with modern web standards to deliver an effortless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3 shadow-sm hover:border-[#804DF2]/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center mx-auto text-2xl shadow-sm">
              <LuShieldCheck size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Absolute Privacy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every calculation, conversion, and compression happens locally inside your browser sandbox. Your data never leaves your device.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3 shadow-sm hover:border-[#804DF2]/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center mx-auto text-2xl shadow-sm">
              <LuZap size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero network latency. Powered by native browser APIs for instantaneous, lag-free calculations without server roundtrips.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3 shadow-sm hover:border-[#804DF2]/40 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center mx-auto text-2xl shadow-sm">
              <LuSmartphone size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Works Everywhere</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fully responsive design tailored for smartphones, tablets, and desktop workstations. No app installations required.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about our web tools platform.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <LuChevronDown
                    size={20}
                    className={`text-slate-400 transform transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
