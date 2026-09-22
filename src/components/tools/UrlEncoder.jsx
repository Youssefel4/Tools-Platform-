import React, { useState } from 'react';
import { LuLink, LuCopy, LuCheck, LuRotateCcw, LuArrowUpDown } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const UrlEncoder = () => {
  const [input, setInput] = useState('https://example.com/search?query=hello world & special=!@#$');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [componentMode, setComponentMode] = useState(true); // encodeURIComponent vs encodeURI
  const [copied, setCopied] = useState(false);

  let output = '';
  try {
    if (mode === 'encode') {
      output = componentMode ? encodeURIComponent(input) : encodeURI(input);
    } else {
      output = componentMode ? decodeURIComponent(input) : decodeURI(input);
    }
  } catch (err) {
    output = 'Error decoding URL: Invalid malformed sequence.';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapText = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const faqs = [
    {
      question: "What is URL percent-encoding?",
      answer: "URL encoding converts reserved characters into percent-encoded triplets (a '%' followed by two hexadecimal digits) so URLs can be transmitted safely over the internet."
    },
    {
      question: "What is the difference between encodeURI and encodeURIComponent?",
      answer: "encodeURI preserves protocol and path delimiters like '://', '/', and '?', whereas encodeURIComponent encodes every special character, making it ideal for query string values."
    }
  ];

  const howToUse = [
    { title: "Paste URL or String", desc: "Type or paste your query parameters, website link, or raw text." },
    { title: "Choose Encode or Decode", desc: "Select between percent-encoding or decoding back to human text." },
    { title: "Copy Clean URL", desc: "Copy the output directly into your application, API query, or browser." }
  ];

  return (
    <ToolLayout
      title="URL Encoder & Decoder"
      subtitle="Safely percent-encode and decode URLs, query strings, and URI components."
      category="converters"
      categoryName="Converters"
      icon={LuLink}
      badge="New"
      seoKeywords="url encoder, url decoder, percent encoding, uri component encode, url escape online"
      seoDescription="Free online URL encoder and decoder tool. Safely percent-encode and decode web links, query parameters, and UTF-8 strings."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['base-converter', 'hash-generator', 'regex-tester']}
    >
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Decode
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={componentMode}
              onChange={(e) => setComponentMode(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            Encode URI Component (Full Strict)
          </label>

          <button
            onClick={swapText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LuArrowUpDown size={14} /> Swap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Box */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Input Text ({mode === 'encode' ? 'Raw URL / String' : 'Encoded String'})
              </label>
              <button
                onClick={() => setInput('')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={8}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste URL or string here..."
            />
          </div>

          {/* Output Box */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Output ({mode === 'encode' ? 'Percent-Encoded' : 'Decoded'})
              </label>
              <button
                onClick={handleCopy}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              rows={8}
              readOnly
              value={output}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-sm outline-none cursor-text"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UrlEncoder;
