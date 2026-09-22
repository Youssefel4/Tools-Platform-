import React, { useState } from 'react';
import { LuCode, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testString, setTestString] = useState(
    'Reach out to our team at support@example.com or sales.dept@company.org for assistance.'
  );

  const flagStr = Object.keys(flags).filter(k => flags[k]).join('');

  let matches = [];
  let error = null;

  try {
    if (pattern) {
      const regex = new RegExp(pattern, flagStr);
      if (flags.g) {
        let m;
        while ((m = regex.exec(testString)) !== null) {
          matches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1)
          });
          if (regex.lastIndex === m.index) regex.lastIndex++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) {
          matches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1)
          });
        }
      }
    }
  } catch (err) {
    error = err.message;
  }

  const toggleFlag = (flag) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const presets = [
    { name: 'Email Address', pat: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b' },
    { name: 'URL / Web Link', pat: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'Phone Number (US)', pat: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})' },
    { name: 'IPv4 Address', pat: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b' }
  ];

  const faqs = [
    {
      question: "What are common regular expression flags?",
      answer: "g (Global: find all matches), i (Case-insensitive: ignore uppercase/lowercase), m (Multiline: ^ and $ match start/end of line), and s (DotAll: allows . to match newline characters)."
    },
    {
      question: "Are capture groups supported in this tester?",
      answer: "Yes, any sub-patterns enclosed in parentheses () will be parsed and displayed under individual match groups."
    }
  ];

  const howToUse = [
    { title: "Enter Regex Pattern", desc: "Type your regular expression pattern or select a quick preset." },
    { title: "Toggle Regex Flags", desc: "Select global (g), case-insensitive (i), or multiline (m) flags." },
    { title: "Inspect Captures", desc: "View real-time match indices and captured groups." }
  ];

  return (
    <ToolLayout
      title="Regex Tester & Debugger"
      subtitle="Test regular expressions in real-time with flag toggles, capture groups, and presets."
      category="developer"
      categoryName="Developer Tools"
      icon={LuCode}
      badge="Developer"
      seoKeywords="regex tester, regular expression tester, regex online, regex debugger, test regex"
      seoDescription="Free online regular expression tester. Test regex patterns with instant match highlighting, capture groups, and common presets."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['json-formatter', 'hash-generator', 'url-encoder']}
    >
      <div className="space-y-6">
        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Presets:</span>
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => setPattern(p.pat)}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Pattern Input & Flags */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 text-xl font-bold">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter regular expression..."
            />
            <span className="font-mono text-slate-400 text-xl font-bold">/</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              {['g', 'i', 'm', 's'].map(flag => (
                <button
                  key={flag}
                  onClick={() => toggleFlag(flag)}
                  className={`w-7 h-7 rounded-lg font-bold transition-all ${
                    flags[flag]
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                  title={`Toggle flag: ${flag}`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
        </div>

        {/* Test String */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Test String
          </label>
          <textarea
            rows={5}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            placeholder="Enter string to test pattern against..."
          />
        </div>

        {/* Matches Section */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 font-bold text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span>Matches Found ({matches.length})</span>
          </div>

          <div className="p-4 space-y-2 max-h-72 overflow-y-auto">
            {matches.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No matches found.</p>
            ) : (
              matches.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-950/60 px-2 py-1 rounded">
                      {m.match}
                    </span>
                  </div>
                  <span className="text-slate-400">Position: {m.index}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexTester;
