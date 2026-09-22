import React, { useState } from 'react';
import { LuGitCompare, LuRotateCcw } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TextDiffChecker = () => {
  const initialOriginal = `Welcome to Tools Platform!
All tools are free and secure.
Tools run on remote servers.
Instant calculations.`;

  const initialModified = `Welcome to Tools Platform!
All tools are 100% free and private.
Tools run locally in your browser with zero tracking.
Instant calculations.
Designed for modern productivity.`;

  const [original, setOriginal] = useState(initialOriginal);
  const [modified, setModified] = useState(initialModified);

  // Line-by-line simple diff
  const origLines = original.split('\n');
  const modLines = modified.split('\n');

  const diffResult = [];
  let addedCount = 0;
  let removedCount = 0;

  // Track max lines
  const maxL = Math.max(origLines.length, modLines.length);
  for (let i = 0; i < maxL; i++) {
    const oLine = origLines[i];
    const mLine = modLines[i];

    if (oLine === mLine) {
      diffResult.push({ type: 'unchanged', text: oLine, lineNum: i + 1 });
    } else {
      if (oLine !== undefined && !modLines.includes(oLine)) {
        diffResult.push({ type: 'removed', text: oLine, lineNum: i + 1 });
        removedCount++;
      }
      if (mLine !== undefined && !origLines.includes(mLine)) {
        diffResult.push({ type: 'added', text: mLine, lineNum: i + 1 });
        addedCount++;
      }
    }
  }

  const faqs = [
    {
      question: "How does this Text Diff Checker compare text?",
      answer: "It splits both texts by newline and analyzes differences line by line, highlighting additions in green and deletions in red."
    },
    {
      question: "Can I use this to compare code snippets or essays?",
      answer: "Yes, it works with any source code, JSON configuration, essay draft, or legal document comparison."
    }
  ];

  const howToUse = [
    { title: "Paste Original Text", desc: "Place the initial or unmodified version in the left box." },
    { title: "Paste Revised Text", desc: "Place the updated version in the right box." },
    { title: "Review Visual Diff", desc: "Inspect highlighted additions in green and deletions in red below." }
  ];

  return (
    <ToolLayout
      title="Text Diff Checker"
      subtitle="Compare two texts or code files side-by-side to highlight added, removed, and modified lines."
      category="text"
      categoryName="Text Tools"
      icon={LuGitCompare}
      badge="Popular"
      seoKeywords="text diff checker, diff tool, compare text, code diff online, text difference"
      seoDescription="Free online text diff checker. Compare two text files or code snippets side-by-side with color-coded added and removed line highlights."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'case-converter', 'markdown-previewer']}
    >
      <div className="space-y-6">
        {/* Input Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Original Text (Before)
              </label>
              <button
                onClick={() => setOriginal('')}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={8}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              placeholder="Paste original version..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Modified Text (After)
              </label>
              <button
                onClick={() => setModified('')}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={8}
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              placeholder="Paste modified version..."
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider">Differences Found:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            +{addedCount} Added
          </span>
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            −{removedCount} Removed
          </span>
        </div>

        {/* Diff Output Viewer */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 font-bold text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            Visual Comparison Output
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm space-y-1 overflow-x-auto max-h-96">
            {diffResult.map((line, idx) => {
              if (line.type === 'added') {
                return (
                  <div key={idx} className="flex items-center gap-3 p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-l-4 border-emerald-500">
                    <span className="text-emerald-500 font-bold w-4 text-center">+</span>
                    <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                  </div>
                );
              }
              if (line.type === 'removed') {
                return (
                  <div key={idx} className="flex items-center gap-3 p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border-l-4 border-rose-500 line-through opacity-75">
                    <span className="text-rose-500 font-bold w-4 text-center">−</span>
                    <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex items-center gap-3 p-1.5 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-300 dark:text-slate-600 w-4 text-center"> </span>
                  <span className="flex-1 whitespace-pre-wrap">{line.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextDiffChecker;
