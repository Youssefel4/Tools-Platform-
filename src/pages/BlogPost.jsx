import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { LuClock, LuCalendar, LuArrowLeft, LuArrowRight, LuCheckCircle2, LuShare2, LuBookmark } from 'react-icons/lu';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related / other posts for internal cross-linking
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2);

  // Helper to parse basic markdown headers and bolding
  const renderMarkdownContent = (content) => {
    // Convert headers, tables, code blocks, and markdown links
    const lines = content.trim().split('\n');
    const elements = [];
    let inTable = false;
    let tableRows = [];

    const flushTable = (key) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(2); // skip separator row
        elements.push(
          <div key={`table-${key}`} className="my-6 overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase text-xs">
                <tr>
                  {header.split('|').filter(c => c.trim().length > 0).map((cell, i) => (
                    <th key={i} className="py-3 px-4 font-bold">{cell.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    {row.split('|').filter(c => c.trim().length > 0).map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-4 font-mono text-xs sm:text-sm">
                        {cell.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('|')) {
        inTable = true;
        tableRows.push(trimmed);
        return;
      } else if (inTable) {
        flushTable(idx);
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-10 mb-4 tracking-tight">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-slate-700 dark:text-slate-300 mb-1.5 leading-relaxed text-base">
            {parseInlineLinks(trimmed.replace('- ', ''))}
          </li>
        );
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-slate-700 dark:text-slate-300 mb-2 leading-relaxed text-base">
            {parseInlineLinks(trimmed.replace(/^\d+\.\s*/, ''))}
          </li>
        );
      } else if (trimmed.length > 0 && !trimmed.startsWith('---')) {
        elements.push(
          <p key={idx} className="text-slate-700 dark:text-slate-300 mb-5 leading-relaxed text-base sm:text-lg font-normal">
            {parseInlineLinks(trimmed)}
          </p>
        );
      }
    });

    if (inTable) flushTable('end');

    return elements;
  };

  // Replace markdown links [text](url) with React Router Links
  const parseInlineLinks = (text) => {
    const parts = [];
    let lastIndex = 0;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(parseBolding(text.slice(lastIndex, match.index)));
      }
      const label = match[1];
      const url = match[2];

      if (url.startsWith('/')) {
        parts.push(
          <Link key={match.index} to={url} className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold underline">
            {label}
          </a>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(parseBolding(text.slice(lastIndex)));
    }
    return parts.length > 0 ? parts : parseBolding(text);
  };

  const parseBolding = (str) => {
    if (typeof str !== 'string') return str;
    const parts = str.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-slate-900 dark:text-white">{part}</strong> : part));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <SEO
        title={post.seoTitle || post.title}
        description={post.metaDescription}
        keywords={post.targetKeyword}
        article={post}
      />

      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 text-sm text-slate-500">
          <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <LuArrowLeft size={16} /> Back to Guides
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LuShare2 size={14} /> Share Guide
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <LuClock size={13} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 pt-2">
            <span>By <strong className="text-slate-800 dark:text-slate-200">{post.author.name}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <LuCalendar size={14} /> {post.publishedDate}
            </span>
          </div>
        </header>

        {/* High-Converting Embedded Tool Callout Box */}
        {post.relatedTool && (
          <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider opacity-90 block mb-1">
                Featured Free Tool
              </span>
              <h3 className="text-xl sm:text-2xl font-black">{post.relatedTool.name}</h3>
              <p className="text-sm opacity-90 mt-1 max-w-xl">
                {post.relatedTool.description}
              </p>
            </div>
            <Link
              to={post.relatedTool.href}
              className="px-6 py-3 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm shadow-md transition-all flex-shrink-0"
            >
              Launch Tool Now →
            </Link>
          </div>
        )}

        {/* Article Body */}
        <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 mb-14">
          {renderMarkdownContent(post.content)}
        </article>

        {/* Bottom Tool CTA Box */}
        {post.relatedTool && (
          <div className="mb-14 p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Try the {post.relatedTool.name} for Free
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              100% private. Run everything directly in your browser with zero data tracking.
            </p>
            <Link
              to={post.relatedTool.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg transition-all"
            >
              Open {post.relatedTool.name} <LuArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Related Articles Internal Cross-Linking */}
        {otherPosts.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map(p => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all"
                >
                  <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                    {p.category}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
