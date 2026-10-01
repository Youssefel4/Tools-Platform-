import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuChevronRight, LuChevronDown, LuShieldCheck, LuZap, LuArrowRight } from 'react-icons/lu';
import SEO from './SEO';
import { ALL_TOOLS } from '../data/toolsRegistry';

const ToolLayout = ({
  title,
  subtitle,
  category,
  categoryName,
  icon: Icon,
  badge,
  children,
  howToUse = [],
  features = [],
  faqs = [],
  relatedToolIds = [],
  blogSlug,
  blogTitle,
  seoKeywords,
  seoDescription
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const relatedTools = ALL_TOOLS.filter(t => relatedToolIds.includes(t.id)).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": title,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": seoDescription || subtitle
  };

  const location = useLocation();
  const currentUrl = `https://platformtools.netlify.app${location.pathname}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <SEO
        title={title}
        description={seoDescription || subtitle}
        keywords={seoKeywords}
        url={currentUrl}
        structuredData={structuredData}
        faqs={faqs}
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-[#804DF2] transition-colors shrink-0">Home</Link>
          <LuChevronRight size={13} className="shrink-0 text-slate-400" />
          {categoryName && (
            <>
              <span className="capitalize shrink-0">{categoryName}</span>
              <LuChevronRight size={13} className="shrink-0 text-slate-400" />
            </>
          )}
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
        </nav>

        {/* Tool Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4">
            {Icon && (
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#804DF2] flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-[#804DF2]/20 flex-shrink-0 mt-0.5 sm:mt-0">
                <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {title}
                </h1>
                {badge && (
                  <span className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-100 text-[#804DF2] dark:bg-purple-900/60 dark:text-[#a782f7] shrink-0">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pl-14 sm:pl-0 shrink-0">
            <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              <LuShieldCheck className="text-[#804DF2]" size={13} /> 100% Private
            </span>
            <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
              <LuZap className="text-[#804DF2]" size={13} /> Instant
            </span>
          </div>
        </div>

        {/* Interactive Tool Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          {children}
        </div>

        {/* Optional Link to Relevant Blog Article */}
        {blogSlug && (
          <div className="mb-12 p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-[#804DF2]/20 dark:border-[#804DF2]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#804DF2] dark:text-[#a782f7]">
                In-Depth Educational Guide
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {blogTitle || 'Learn more with our comprehensive tutorial'}
              </h3>
            </div>
            <Link
              to={`/blog/${blogSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#804DF2] hover:bg-[#6c3bde] text-white text-sm font-semibold transition-all shadow-md flex-shrink-0"
            >
              Read Guide <LuArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* How to Use Section */}
        {howToUse.length > 0 && (
          <div className="mb-8 sm:mb-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
              <LuZap className="text-[#804DF2]" size={18} /> How to Use {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              {howToUse.map((step, idx) => (
                <div key={idx} className="relative p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#804DF2] text-white text-xs sm:text-sm font-bold flex items-center justify-center mb-2.5 sm:mb-3">
                    {idx + 1}
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        {features.length > 0 && (
          <div className="mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center mb-3 sm:mb-4">
                  <LuShieldCheck size={18} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5 sm:mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Frequently Asked Questions */}
        {faqs.length > 0 && (
          <div className="mb-8 sm:mb-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2.5 sm:space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-xs sm:text-base pr-2">{faq.question}</span>
                      <LuChevronDown
                        size={16}
                        className={`text-[#804DF2] transform transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 sm:p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Tools Recommendation */}
        {relatedTools.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 sm:pt-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Explore Related Online Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map(tool => {
                const ToolIcon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    to={tool.href}
                    className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-[#804DF2]/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-[#804DF2] text-white flex items-center justify-center text-sm">
                        <ToolIcon size={18} />
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7] transition-colors">
                        {tool.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolLayout;
