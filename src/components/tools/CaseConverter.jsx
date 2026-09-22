import React, { useState } from 'react';
import { LuType, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CaseConverter = () => {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [copiedKey, setCopiedKey] = useState(null);

  // Conversion algorithms
  const toUpper = (str) => str.toUpperCase();
  const toLower = (str) => str.toLowerCase();

  const toSentence = (str) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitle = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const toWords = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_\-]+/g, ' ')
      .trim()
      .split(/\s+/);
  };

  const toCamel = (str) => {
    const words = toWords(str);
    return words
      .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
      .join('');
  };

  const toPascal = (str) => {
    const words = toWords(str);
    return words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('');
  };

  const toSnake = (str) => {
    return toWords(str).map((w) => w.toLowerCase()).join('_');
  };

  const toKebab = (str) => {
    return toWords(str).map((w) => w.toLowerCase()).join('-');
  };

  const toConstant = (str) => {
    return toWords(str).map((w) => w.toUpperCase()).join('_');
  };

  const toAlternating = (str) => {
    let alt = '';
    for (let i = 0; i < str.length; i++) {
      alt += i % 2 === 0 ? str[i].toLowerCase() : str[i].toUpperCase();
    }
    return alt;
  };

  const cases = [
    { id: 'upper', label: 'UPPERCASE', result: toUpper(text) },
    { id: 'lower', label: 'lowercase', result: toLower(text) },
    { id: 'title', label: 'Title Case', result: toTitle(text) },
    { id: 'sentence', label: 'Sentence case', result: toSentence(text) },
    { id: 'camel', label: 'camelCase', result: toCamel(text) },
    { id: 'pascal', label: 'PascalCase', result: toPascal(text) },
    { id: 'snake', label: 'snake_case', result: toSnake(text) },
    { id: 'kebab', label: 'kebab-case', result: toKebab(text) },
    { id: 'constant', label: 'CONSTANT_CASE', result: toConstant(text) },
    { id: 'alt', label: 'aLtErNaTiNg cAsE', result: toAlternating(text) }
  ];

  const handleCopy = (val, id) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const faqs = [
    {
      question: "What is camelCase vs snake_case vs kebab-case?",
      answer: "camelCase capitalizes each new word without spaces (e.g., userProfilePicture). snake_case separates words with underscores (e.g., user_profile_picture), and kebab-case joins words with hyphens (e.g., user-profile-picture)."
    },
    {
      question: "How does Sentence case capitalization work?",
      answer: "Sentence case capitalizes only the first letter of each sentence following terminal punctuation (. ! ?), matching standard English prose."
    }
  ];

  const howToUse = [
    { title: "Type or Paste Text", desc: "Input any text string, identifier, or paragraph." },
    { title: "Review Formatted Cases", desc: "Instantly view your text rendered across 10 distinct casing conventions." },
    { title: "One-Click Copy", desc: "Click the copy button beside any case format to copy it immediately." }
  ];

  return (
    <ToolLayout
      title="Case Converter"
      subtitle="Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case."
      category="converters"
      categoryName="Converters"
      icon={LuType}
      badge="New"
      seoKeywords="case converter, uppercase, lowercase, title case, camelcase, snake_case, text capitalizer"
      seoDescription="Free online text case converter. Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case with instant copy."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'text-reverser', 'lorem-ipsum-generator']}
    >
      <div className="space-y-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Your Original Text
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type or paste text here..."
          />
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 hover:border-blue-500/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {c.label}
                </span>
                <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {c.result || '—'}
                </p>
              </div>
              <button
                onClick={() => handleCopy(c.result, c.id)}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors flex-shrink-0"
                title={`Copy ${c.label}`}
              >
                {copiedKey === c.id ? <LuCheck size={16} className="text-emerald-500" /> : <LuCopy size={16} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;
