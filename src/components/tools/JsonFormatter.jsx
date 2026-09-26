import React, { useState } from 'react';
import { LuBraces, LuCopy, LuCheck, LuMinimize2, LuMaximize2, LuTriangleAlert } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const JsonFormatter = () => {
  const sample = `{"platform":"Tools Platform","version":2.0,"features":["free","private","instant"],"settings":{"darkMode":true,"rating":4.9}}`;

  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "Why does my JSON fail to parse?",
      answer: "Common JSON syntax errors include trailing commas, unquoted keys, single quotes instead of double quotes, and unescaped line breaks."
    },
    {
      question: "What is the difference between beautifying and minifying JSON?",
      answer: "Beautifying adds newlines and indentation for easy human readability, while minifying strips all whitespace to minimize network payload size."
    }
  ];

  const howToUse = [
    { title: "Paste JSON String", desc: "Paste raw or compressed JSON data into the editor." },
    { title: "Beautify or Minify", desc: "Click Format (2 or 4 spaces) or Minify to compact all whitespace." },
    { title: "Copy Validated Output", desc: "Copy the formatted JSON or inspect syntax error highlights." }
  ];

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      subtitle="Beautify, indent, minify, and validate JSON data structures with instant syntax checking."
      category="developer"
      categoryName="Developer Tools"
      icon={LuBraces}
      badge="Developer"
      seoKeywords="json formatter, json validator, json beautifier, format json, minify json online"
      seoDescription="Free online JSON formatter and validator. Beautify, indent, validate syntax, and minify JSON data with instant error detection."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['csv-json-converter', 'regex-tester', 'hash-generator']}
    >
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => formatJson(2)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-sm"
            >
              Format (2 Spaces)
            </button>
            <button
              onClick={() => formatJson(4)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all"
            >
              Format (4 Spaces)
            </button>
            <button
              onClick={minifyJson}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all"
            >
              Minify (Compact)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setInput(sample); formatJson(2); }}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Sample JSON
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-mono">
            <LuTriangleAlert size={13} className="inline mr-1" /> Invalid JSON: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Input Raw JSON
            </label>
            <textarea
              rows={14}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
              placeholder="Paste raw JSON here..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Formatted Output
            </label>
            <textarea
              rows={14}
              readOnly
              value={output || input}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs outline-none leading-relaxed resize-y"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;
