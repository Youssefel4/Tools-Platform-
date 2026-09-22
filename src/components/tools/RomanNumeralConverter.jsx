import React, { useState } from 'react';
import { LuHash, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const RomanNumeralConverter = () => {
  const [numInput, setNumInput] = useState('2026');
  const [romanOutput, setRomanOutput] = useState('MMXXVI');

  const [romanInput, setRomanInput] = useState('MMXXVI');
  const [numOutput, setNumOutput] = useState('2026');

  const [copied, setCopied] = useState(null);

  const romanMap = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  const intToRoman = (num) => {
    let n = parseInt(num, 10);
    if (isNaN(n) || n < 1 || n > 3999) return '';
    let result = '';
    for (const { value, numeral } of romanMap) {
      while (n >= value) {
        result += numeral;
        n -= value;
      }
    }
    return result;
  };

  const romanToInt = (str) => {
    if (!str) return '';
    const cleanStr = str.toUpperCase().trim();
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < cleanStr.length; i++) {
      const current = map[cleanStr[i]];
      const next = map[cleanStr[i + 1]];
      if (!current) return 'Invalid';
      if (next && current < next) {
        total -= current;
      } else {
        total += current;
      }
    }
    return total > 0 ? total.toString() : '';
  };

  const handleNumChange = (val) => {
    setNumInput(val);
    setRomanOutput(intToRoman(val));
  };

  const handleRomanChange = (val) => {
    setRomanInput(val);
    setNumOutput(romanToInt(val));
  };

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqs = [
    {
      question: "What are the fundamental Roman numeral symbols?",
      answer: "The seven basic Roman symbols are: I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, and M = 1000."
    },
    {
      question: "How do subtractive Roman numerals work?",
      answer: "When a smaller numeral appears before a larger one, you subtract it: IV = 4 (5 - 1), IX = 9 (10 - 1), XL = 40 (50 - 10), XC = 90 (100 - 10), CD = 400 (500 - 100), and CM = 900 (1000 - 100)."
    }
  ];

  const howToUse = [
    { title: "Input Number or Roman Numeral", desc: "Type a standard integer (1 to 3999) or enter Roman letters." },
    { title: "Instant Bidirectional Conversion", desc: "Results update with instant syntax checking." },
    { title: "Quick Clipboard Copy", desc: "Copy the output numeral or decimal value instantly." }
  ];

  return (
    <ToolLayout
      title="Roman Numeral Converter"
      subtitle="Convert numbers to Roman numerals and Roman numerals back to numbers instantly."
      category="converters"
      categoryName="Converters"
      icon={LuHash}
      badge="New"
      seoKeywords="roman numeral converter, numbers to roman numerals, roman to arabic numbers, convert roman numerals"
      seoDescription="Free online Roman Numeral converter. Convert numbers to Roman numerals and Roman numerals back to numbers with instantaneous validation."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['base-converter', 'unit-converter', 'calculator']}
    >
      <div className="space-y-8 max-w-xl mx-auto">
        {/* Number to Roman */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Number to Roman Numeral (1 – 3,999)
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="3999"
              value={numInput}
              onChange={(e) => handleNumChange(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2026"
            />
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xl text-blue-700 dark:text-blue-300 min-w-[120px] justify-between">
              <span>{romanOutput || '—'}</span>
              {romanOutput && (
                <button
                  onClick={() => copyVal(romanOutput, 'r1')}
                  className="p-1 hover:text-blue-900 dark:hover:text-white"
                >
                  {copied === 'r1' ? <LuCheck size={16} /> : <LuCopy size={16} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Roman to Number */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Roman Numeral to Number
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={romanInput}
              onChange={(e) => handleRomanChange(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold font-mono text-lg uppercase outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. MCMLXXXIV"
            />
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 font-bold text-xl text-emerald-700 dark:text-emerald-300 min-w-[120px] justify-between">
              <span>{numOutput || '—'}</span>
              {numOutput && numOutput !== 'Invalid' && (
                <button
                  onClick={() => copyVal(numOutput, 'r2')}
                  className="p-1 hover:text-emerald-900 dark:hover:text-white"
                >
                  {copied === 'r2' ? <LuCheck size={16} /> : <LuCopy size={16} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Cheat Sheet */}
        <div className="grid grid-cols-7 gap-2 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 text-center text-xs">
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">I</div><div className="text-slate-500">1</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">V</div><div className="text-slate-500">5</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">X</div><div className="text-slate-500">10</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">L</div><div className="text-slate-500">50</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">C</div><div className="text-slate-500">100</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">D</div><div className="text-slate-500">500</div></div>
          <div><div className="font-bold font-mono text-sm text-slate-900 dark:text-white">M</div><div className="text-slate-500">1000</div></div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RomanNumeralConverter;
