import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <SEO
        title={title}
        description={seoDescription || subtitle}
        keywords={seoKeywords}
        structuredData={structuredData}
        faqs={faqs}
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-[#804DF2] transition-colors">Home</Link>
          <LuChevronRight size={14} />
          {categoryName && (
            <>
              <span className="capitalize">{categoryName}</span>
              <LuChevronRight size={14} />
            </>
          )}
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">{title}</span>
        </nav>

        {/* Tool Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start sm:items-center gap-4">
            {Icon && (
              <div className="w-14 h-14 rounded-2xl bg-[#804DF2] flex items-center justify-center text-white shadow-lg shadow-[#804DF2]/20 flex-shrink-0">
                <Icon size={28} />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h1>
                {badge && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-purple-100 text-[#804DF2] dark:bg-purple-900/60 dark:text-[#a782f7]">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-full shadow-sm">
              <LuShieldCheck className="text-[#804DF2]" size={14} /> 100% Private
            </span>
            <span className="inline-flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-full shadow-sm">
              <LuZap className="text-[#804DF2]" size={14} /> Instant
            </span>
          </div>
        </div>

        {/* Interactive Tool Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/40 dark:shadow-none p-6 sm:p-8 mb-12">
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
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <LuZap className="text-[#804DF2]" size={20} /> How to Use {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {howToUse.map((step, idx) => (
                <div key={idx} className="relative p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-[#804DF2] text-white text-sm font-bold flex items-center justify-center mb-3">
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
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-[#804DF2] dark:text-[#a782f7] flex items-center justify-center mb-4">
                  <LuShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Frequently Asked Questions */}
        {faqs.length > 0 && (
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base">{faq.question}</span>
                      <LuChevronDown
                        size={18}
                        className={`text-[#804DF2] transform transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
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
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
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
