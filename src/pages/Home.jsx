import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LuSearch, LuArrowRight, LuShieldCheck, LuZap, LuSmartphone,
  LuSparkles, LuX, LuBookOpen, LuChevronDown
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white">
      <SEO
        title="Free Online Tools for Everyday Tasks"
        description="Discover 40+ free, fast, and secure online tools. Percentage calculator, password generator, unit converter, QR generator, image resizer, and developer utilities with 100% privacy."
        keywords="free online tools, calculators, unit converter, password generator, qr code generator, image resizer, developer utilities"
        structuredData={structuredData}
        faqs={homeFaqs}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent dark:from-blue-950/20 dark:via-indigo-950/10 pointer-events-none blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>40+ Free Online Web Tools • 100% Private & Instant</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
            Free Online Tools for <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Everyday Tasks
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Simple, fast, and privacy-first web utilities. No registration, no downloads, no ads clutter. Just open in your browser and get things done.
          </p>

          {/* Interactive Live Search Bar (In place of static Explore button) */}
          <div id="tools-search" className="max-w-2xl mx-auto relative mb-6">
            <div className="relative flex items-center">
              <LuSearch className="absolute left-5 text-slate-400" size={22} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 40+ tools... (e.g. 'password', 'bmi', 'qr', 'mortgage', 'diff')"
                className="w-full pl-14 pr-24 py-4 sm:py-5 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-base sm:text-lg shadow-xl shadow-slate-200/50 dark:shadow-none outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-all"
              />
              <div className="absolute right-4 flex items-center gap-2">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Clear search"
                  >
                    <LuX size={18} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-500">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {TOOL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section (Only shown when not actively searching) */}
      {!searchQuery && activeCategory === 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
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
                  className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 shadow-lg shadow-slate-200/30 dark:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-md`}>
                        <ToolIcon size={24} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                        {tool.badge || 'Popular'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
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
              className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
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
                  className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${tool.color} text-white flex items-center justify-center shadow-sm`}>
                        <ToolIcon size={20} />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
            <span>🗂️</span> Structured Tool Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
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
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
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
                          className="group/item flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 py-1 transition-colors"
                        >
                          <span className="truncate pr-2">{tool.name}</span>
                          <LuArrowRight size={12} className="opacity-0 group-hover/item:opacity-100 transform group-hover/item:translate-x-1 transition-all text-blue-500 flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    onClick={() => { setActiveCategory(category.id); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
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
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 border border-blue-200/70 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Knowledge Base & Best Practices
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Featured Guides & Tutorials
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              View All Articles <LuArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
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
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-sm">
              <LuShieldCheck size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Absolute Privacy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every calculation, conversion, and compression happens locally inside your browser sandbox. Your data never leaves your device.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-2xl shadow-sm">
              <LuZap size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lightning Fast</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Zero network latency. Powered by native browser APIs for instantaneous, lag-free calculations without server roundtrips.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto text-2xl shadow-sm">
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
