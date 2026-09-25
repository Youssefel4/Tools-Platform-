import React, { useState } from 'react';
import { LuType, LuCopy, LuCheck, LuTrash2, LuClock } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const TextCounter = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const countWords = (t) => {
    return t.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const countCharacters = (t) => t.length;
  const countCharactersNoSpaces = (t) => t.replace(/\s/g, '').length;
  const countSentences = (t) => t.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const countParagraphs = (t) => t.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const countLines = (t) => t ? t.split('\n').length : 0;
  const readingTime = (t) => Math.ceil(countWords(t) / 200);

  const clearText = () => setText('');
  const copyText = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const words = countWords(text);
  const chars = countCharacters(text);
  const charsNoSpaces = countCharactersNoSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const readTime = readingTime(text);

  const faqs = [
    {
      question: "Does the counter include spaces in character counts?",
      answer: "Both metrics are shown simultaneously: total characters including spaces, and pure characters excluding whitespace."
    },
    {
      question: "How is reading time calculated?",
      answer: "Reading time is calculated based on standard human reading comprehension speeds of 200 words per minute."
    },
    {
      question: "Can I use this for social media character limits?",
      answer: "Yes, it is perfect for Twitter/X posts (280 characters), LinkedIn updates (3,000 characters), and SEO meta descriptions (160 characters)."
    }
  ];

  const howToUse = [
    { title: "Paste or Type Text", desc: "Enter or paste your text directly into the interactive text editor box." },
    { title: "Review Live Stats", desc: "Watch words, characters, sentences, paragraphs, and reading time update in real time." },
    { title: "Copy or Clear", desc: "Use the action buttons to copy your text to the clipboard or start fresh with a clean slate." }
  ];

  const features = [
    { title: "Real-time Analysis", desc: "Every metric recalculates smoothly as you type with zero input latency." },
    { title: "Comprehensive Stats", desc: "Includes characters with and without whitespace, paragraphs, and lines." },
    { title: "100% Confidential", desc: "Your texts and private drafts are never sent to external servers or logged." }
  ];

  return (
    <ToolLayout
      title="Online Word & Character Counter"
      subtitle="Accurate real-time counter for words, characters, spaces, sentences, paragraphs, and reading time."
      category="text"
      categoryName="Text & Writing"
      icon={LuType}
      badge="Popular"
      seoDescription="Free online word counter and character counter. Count characters with/without spaces, sentences, paragraphs, and estimate reading time in real time."
      seoKeywords="word counter, character counter, text counter, word count tool, character count online, reading time calculator, text analyzer"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['case-converter', 'text-reverser', 'lorem-ipsum-generator']}
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-center">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">{words}</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">Words</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{chars}</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">Characters</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 font-mono">{charsNoSpaces}</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">No Spaces</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 font-mono">{sentences}</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">Sentences</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 font-mono">{paragraphs}</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">Paragraphs</p>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-center">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">~{readTime}m</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1 uppercase">Reading Time</p>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Type or paste your text here to analyze words, characters, and reading time..."
            className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl font-sans text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner resize-y"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
            <span>Lines: <strong className="text-slate-800 dark:text-slate-200">{lines}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1"><LuClock size={12} /> Reading Speed: ~200 WPM</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearText}
              disabled={!text}
              className="px-4 py-2 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-900/30 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-xs transition-colors disabled:opacity-40 flex items-center gap-1.5"
            >
              <LuTrash2 size={13} /> Clear
            </button>
            <button
              onClick={copyText}
              disabled={!text}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <LuCheck size={13} /> : <LuCopy size={13} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextCounter;
