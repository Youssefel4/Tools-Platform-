import React, { useState } from 'react';
import { LuBinary, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const BaseConverter = () => {
  const [dec, setDec] = useState('255');
  const [bin, setBin] = useState('11111111');
  const [hex, setHex] = useState('FF');
  const [oct, setOct] = useState('377');
  const [copied, setCopied] = useState(null);

  const updateFromDec = (val) => {
    setDec(val);
    const n = parseInt(val, 10);
    if (!isNaN(n)) {
      setBin(n.toString(2));
      setHex(n.toString(16).toUpperCase());
      setOct(n.toString(8));
    } else {
      setBin('');
      setHex('');
      setOct('');
    }
  };

  const updateFromBin = (val) => {
    setBin(val);
    const n = parseInt(val, 2);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setHex(n.toString(16).toUpperCase());
      setOct(n.toString(8));
    } else {
      setDec('');
      setHex('');
      setOct('');
    }
  };

  const updateFromHex = (val) => {
    setHex(val);
    const n = parseInt(val, 16);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setBin(n.toString(2));
      setOct(n.toString(8));
    } else {
      setDec('');
      setBin('');
      setOct('');
    }
  };

  const updateFromOct = (val) => {
    setOct(val);
    const n = parseInt(val, 8);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setBin(n.toString(2));
      setHex(n.toString(16).toUpperCase());
    } else {
      setDec('');
      setBin('');
      setHex('');
    }
  };

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqs = [
    {
      question: "What number systems does this base converter support?",
      answer: "It supports synchronous real-time conversion between Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16), and Octal (Base 8)."
    },
    {
      question: "Why is hexadecimal used so often in computing?",
      answer: "Hexadecimal groups 4 binary bits (a nibble) into a single human-readable character (0-9, A-F), making memory addresses, color codes, and byte sequences concise."
    }
  ];

  const howToUse = [
    { title: "Choose Any Field", desc: "Start typing in Decimal, Binary, Hex, or Octal." },
    { title: "Live Synchronous Conversion", desc: "All other base fields update simultaneously in real time." },
    { title: "One-Click Copy", desc: "Copy any converted numerical value directly to your clipboard." }
  ];

  return (
    <ToolLayout
      title="Number Base Converter"
      subtitle="Convert numbers synchronously between Decimal, Binary, Hexadecimal, and Octal."
      category="converters"
      categoryName="Converters"
      icon={LuBinary}
      badge="New"
      seoKeywords="base converter, binary to decimal, hex to decimal, octal converter, binary converter online"
      seoDescription="Free online number base converter. Convert between Decimal, Binary, Hexadecimal, and Octal numbers simultaneously with real-time feedback."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['unit-converter', 'hash-generator', 'calculator']}
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Decimal */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Decimal (Base 10)
            </label>
            <button
              onClick={() => copyVal(dec, 'dec')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied === 'dec' ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied === 'dec' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={dec}
            onChange={(e) => updateFromDec(e.target.value)}
            className="w-full font-mono text-lg font-bold bg-transparent text-slate-900 dark:text-white outline-none"
            placeholder="e.g. 255"
          />
        </div>

        {/* Binary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Binary (Base 2)
            </label>
            <button
              onClick={() => copyVal(bin, 'bin')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied === 'bin' ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied === 'bin' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={bin}
            onChange={(e) => updateFromBin(e.target.value)}
            className="w-full font-mono text-lg font-bold bg-transparent text-slate-900 dark:text-white outline-none"
            placeholder="e.g. 11111111"
          />
        </div>

        {/* Hexadecimal */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hexadecimal (Base 16)
            </label>
            <button
              onClick={() => copyVal(hex, 'hex')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied === 'hex' ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied === 'hex' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full font-mono text-lg font-bold bg-transparent text-slate-900 dark:text-white outline-none uppercase"
            placeholder="e.g. FF"
          />
        </div>

        {/* Octal */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Octal (Base 8)
            </label>
            <button
              onClick={() => copyVal(oct, 'oct')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied === 'oct' ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied === 'oct' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <input
            type="text"
            value={oct}
            onChange={(e) => updateFromOct(e.target.value)}
            className="w-full font-mono text-lg font-bold bg-transparent text-slate-900 dark:text-white outline-none"
            placeholder="e.g. 377"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default BaseConverter;
