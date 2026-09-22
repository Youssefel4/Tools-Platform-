import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { LuFileCode, LuCopy, LuCheck, LuDownload } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const MarkdownPreviewer = () => {
  const initialMarkdown = `# Markdown Live Editor & Preview

Welcome to the **live markdown editor**! Write markdown on the left and see clean rendered HTML on the right.

## Features:
- **Instant Live Preview**: Updates as you type
- *Styling Support*: Italic, bold, code blocks, blockquotes
- [Links](https://example.com) and lists

### Code Example:
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
\`\`\`

> "Simplicity is the soul of efficiency." — Austin Freeman

1. First ordered item
2. Second ordered item
3. Third ordered item
`;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [copied, setCopied] = useState(false);

  // Lightweight markdown-to-HTML parser (clean & secure)
  const parseMarkdown = (md) => {
    let html = md
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 text-slate-100 p-4 rounded-xl overflow-x-auto text-xs my-3 font-mono"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono text-blue-600 dark:text-blue-400">$1</code>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-slate-900 dark:text-white mb-4">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-1 my-3 text-slate-600 dark:text-slate-400 italic bg-blue-50/50 dark:bg-slate-800/40 rounded-r">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline font-medium">$1</a>')
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc text-slate-700 dark:text-slate-300">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-5 list-decimal text-slate-700 dark:text-slate-300">$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '<br/><br/>');

    return DOMPurify.sanitize(html);
  };

  const insertMarkup = (before, after = '') => {
    setMarkdown(prev => prev + `\n${before}text${after}`);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(parseMarkdown(markdown));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is Markdown?",
      answer: "Markdown is a lightweight markup language with plain-text formatting syntax designed to be easy to read and write, which converts directly into structured HTML."
    },
    {
      question: "Can I copy the compiled HTML for my website or CMS?",
      answer: "Yes, click 'Copy HTML' to copy the fully formatted, sanitized HTML output ready to paste into WordPress, Notion, or custom code."
    }
  ];

  const howToUse = [
    { title: "Write or Paste Markdown", desc: "Type markdown syntax in the left panel." },
    { title: "Use Toolbar Shortcuts", desc: "Quickly insert headings, bold text, lists, and code blocks." },
    { title: "Export Sanitized HTML", desc: "Copy the clean compiled HTML directly to your clipboard." }
  ];

  return (
    <ToolLayout
      title="Markdown Live Editor & Preview"
      subtitle="Interactive split-pane Markdown editor with real-time HTML preview and syntax toolbar."
      category="text"
      categoryName="Text Tools"
      icon={LuFileCode}
      badge="New"
      seoKeywords="markdown previewer, markdown editor, live markdown, md to html, online markdown preview"
      seoDescription="Free online Markdown previewer and live editor. Write Markdown with real-time HTML preview, syntax shortcuts, and sanitized HTML export."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'case-converter', 'notes']}
    >
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => insertMarkup('# ')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs"
            >
              H1
            </button>
            <button
              onClick={() => insertMarkup('## ')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs"
            >
              H2
            </button>
            <button
              onClick={() => insertMarkup('**', '**')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs"
            >
              B
            </button>
            <button
              onClick={() => insertMarkup('*', '*')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 italic text-xs font-semibold"
            >
              I
            </button>
            <button
              onClick={() => insertMarkup('> ')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Quote
            </button>
            <button
              onClick={() => insertMarkup('- ')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Bullet List
            </button>
            <button
              onClick={() => insertMarkup('```\n', '\n```')}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs"
            >
              &lt;/&gt;
            </button>
          </div>

          <button
            onClick={handleCopyHtml}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-sm"
          >
            {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
            {copied ? 'HTML Copied!' : 'Copy HTML'}
          </button>
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Markdown Editor
            </label>
            <textarea
              rows={16}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs sm:text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder="Write your markdown here..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Live HTML Preview
            </label>
            <div
              className="w-full min-h-[384px] p-6 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-900 dark:text-white overflow-y-auto leading-relaxed text-sm prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MarkdownPreviewer;
