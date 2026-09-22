import React, { useState } from 'react';
import { LuPercent, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const PercentageCalculator = () => {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState('15');
  const [val1B, setVal1B] = useState('200');

  // Mode 2: X is what % of Y?
  const [val2A, setVal2A] = useState('35');
  const [val2B, setVal2B] = useState('140');

  // Mode 3: Percentage increase / decrease from X to Y
  const [val3A, setVal3A] = useState('80');
  const [val3B, setVal3B] = useState('120');

  const [copied, setCopied] = useState(null);

  const copyResult = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Calculations
  const res1 = (parseFloat(val1A) && parseFloat(val1B))
    ? ((parseFloat(val1A) / 100) * parseFloat(val1B)).toFixed(2)
    : '0';

  const res2 = (parseFloat(val2A) && parseFloat(val2B) && parseFloat(val2B) !== 0)
    ? ((parseFloat(val2A) / parseFloat(val2B)) * 100).toFixed(2)
    : '0';

  const num3A = parseFloat(val3A);
  const num3B = parseFloat(val3B);
  const diff3 = num3B - num3A;
  const res3 = (num3A && num3A !== 0)
    ? ((diff3 / num3A) * 100).toFixed(2)
    : '0';
  const isIncrease = diff3 >= 0;

  const faqs = [
    {
      question: "How do you calculate percentage of a number?",
      answer: "To calculate X% of Y, divide the percentage by 100 and multiply by the total number: (X / 100) * Y. For example, 15% of 200 is (15 / 100) * 200 = 30."
    },
    {
      question: "How do you find percentage increase or decrease?",
      answer: "Subtract the original value from the new value, divide the result by the original value, and multiply by 100: ((New - Old) / Old) * 100."
    },
    {
      question: "What is X as a percentage of Y?",
      answer: "Divide X by Y and multiply by 100: (X / Y) * 100. For instance, 35 out of 140 is (35 / 140) * 100 = 25%."
    }
  ];

  const howToUse = [
    { title: "Choose Your Mode", desc: "Select from finding X% of Y, calculating what percent X is of Y, or percentage increase/decrease." },
    { title: "Input Numbers", desc: "Type in any numbers. The calculator updates the answers dynamically in real time." },
    { title: "Copy Result", desc: "Click the copy icon beside any result to copy the exact calculation to your clipboard." }
  ];

  return (
    <ToolLayout
      title="Percentage Calculator"
      subtitle="Free instant online percentage calculator for discounts, percentage change, and proportions."
      category="calculators"
      categoryName="Calculators"
      icon={LuPercent}
      badge="Popular"
      seoKeywords="percentage calculator, percent change, calculate percentage, discount calculator"
      seoDescription="Free online percentage calculator. Instantly calculate percentage increase, discount rates, fractions to percentages, and differences with zero lag."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['calculator', 'tip-calculator', 'compound-interest-calculator']}
    >
      <div className="space-y-8">
        {/* Mode 1: What is X% of Y? */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            1. What is <span className="text-blue-600 dark:text-blue-400">X%</span> of <span className="text-blue-600 dark:text-blue-400">Y</span>?
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">What is</span>
            <input
              type="number"
              value={val1A}
              onChange={(e) => setVal1A(e.target.value)}
              className="w-28 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="15"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">% of</span>
            <input
              type="number"
              value={val1B}
              onChange={(e) => setVal1B(e.target.value)}
              className="w-32 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="200"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">=</span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 font-bold text-lg">
              <span>{res1}</span>
              <button
                onClick={() => copyResult(res1, 'm1')}
                className="p-1 hover:text-blue-900 dark:hover:text-white transition-colors"
                title="Copy result"
              >
                {copied === 'm1' ? <LuCheck size={16} /> : <LuCopy size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mode 2: X is what % of Y? */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            2. <span className="text-blue-600 dark:text-blue-400">X</span> is what percent of <span className="text-blue-600 dark:text-blue-400">Y</span>?
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={val2A}
              onChange={(e) => setVal2A(e.target.value)}
              className="w-28 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="35"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">is what % of</span>
            <input
              type="number"
              value={val2B}
              onChange={(e) => setVal2B(e.target.value)}
              className="w-32 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="140"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">=</span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 font-bold text-lg">
              <span>{res2}%</span>
              <button
                onClick={() => copyResult(`${res2}%`, 'm2')}
                className="p-1 hover:text-emerald-900 dark:hover:text-white transition-colors"
                title="Copy result"
              >
                {copied === 'm2' ? <LuCheck size={16} /> : <LuCopy size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mode 3: Percentage increase / decrease */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            3. Percentage Increase or Decrease from <span className="text-blue-600 dark:text-blue-400">X</span> to <span className="text-blue-600 dark:text-blue-400">Y</span>
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">From</span>
            <input
              type="number"
              value={val3A}
              onChange={(e) => setVal3A(e.target.value)}
              className="w-28 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="80"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">to</span>
            <input
              type="number"
              value={val3B}
              onChange={(e) => setVal3B(e.target.value)}
              className="w-32 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="120"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">=</span>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-lg ${
              isIncrease
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
            }`}>
              <span>{isIncrease ? `+${res3}% (Increase)` : `${res3}% (Decrease)`}</span>
              <button
                onClick={() => copyResult(`${res3}%`, 'm3')}
                className="p-1 hover:opacity-80 transition-opacity"
                title="Copy result"
              >
                {copied === 'm3' ? <LuCheck size={16} /> : <LuCopy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PercentageCalculator;
