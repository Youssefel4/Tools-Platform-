import React, { useState } from 'react';
import { LuCoins, LuRotateCcw, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CashCalculator = () => {
  const [counts, setCounts] = useState({
    b100: 0,
    b50: 0,
    b20: 0,
    b10: 0,
    b5: 0,
    b2: 0,
    b1: 0,
    c25: 0,
    c10: 0,
    c5: 0,
    c1: 0
  });

  const [copied, setCopied] = useState(false);

  const bills = [
    { key: 'b100', name: '$100 Bill', val: 100 },
    { key: 'b50', name: '$50 Bill', val: 50 },
    { key: 'b20', name: '$20 Bill', val: 20 },
    { key: 'b10', name: '$10 Bill', val: 10 },
    { key: 'b5', name: '$5 Bill', val: 5 },
    { key: 'b2', name: '$2 Bill', val: 2 },
    { key: 'b1', name: '$1 Bill', val: 1 },
  ];

  const coins = [
    { key: 'c25', name: 'Quarter (25¢)', val: 0.25 },
    { key: 'c10', name: 'Dime (10¢)', val: 0.10 },
    { key: 'c5', name: 'Nickel (5¢)', val: 0.05 },
    { key: 'c1', name: 'Penny (1¢)', val: 0.01 },
  ];

  const handleChange = (key, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setCounts(prev => ({ ...prev, [key]: num }));
  };

  const resetAll = () => {
    const cleared = {};
    Object.keys(counts).forEach(k => cleared[k] = 0);
    setCounts(cleared);
  };

  const totalBills = bills.reduce((sum, b) => sum + (counts[b.key] || 0) * b.val, 0);
  const totalCoins = coins.reduce((sum, c) => sum + (counts[c.key] || 0) * c.val, 0);
  const grandTotal = totalBills + totalCoins;

  const formatCurrency = (val) => '$' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const copyTotal = () => {
    navigator.clipboard.writeText(formatCurrency(grandTotal));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "How does the cash drawer calculator work?",
      answer: "Enter the number of bills or coins you have for each denomination. The tool instantly calculates itemized row totals, bill subtotals, coin subtotals, and the final register balance."
    },
    {
      question: "Is this suitable for daily retail cash balancing?",
      answer: "Yes, it is designed for cashiers, retail store managers, restaurant staff, and event hosts closing out daily cash registers."
    }
  ];

  const howToUse = [
    { title: "Count Physical Cash", desc: "Count your paper notes and loose coins by denomination." },
    { title: "Enter Quantities", desc: "Type the count in each row. Subtotals and grand totals update in real-time." },
    { title: "Copy or Reset", desc: "Copy the final balance to paste into your ledger, or reset the counts with one click." }
  ];

  return (
    <ToolLayout
      title="Cash Counter & Drawer Calculator"
      subtitle="Fast money counting tool for US dollar bills and coins with live subtotals."
      category="calculators"
      categoryName="Calculators"
      icon={LuCoins}
      badge="Popular"
      seoKeywords="cash calculator, cash counter, money calculator, coin counter, cash drawer tally, register count"
      seoDescription="Free online cash counter and money calculator. Easily count dollar bills and coins for retail registers, store deposits, and bank tallies."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['tip-calculator', 'percentage-calculator', 'calculator']}
    >
      <div className="space-y-8">
        {/* Top Summary Bar */}
        <div className="p-6 rounded-3xl bg-[#804DF2] text-white shadow-xl shadow-[#804DF2]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">Total Cash Count</span>
            <div className="text-4xl sm:text-5xl font-black mt-1">
              {formatCurrency(grandTotal)}
            </div>
            <div className="text-sm opacity-90 mt-1">
              Bills: {formatCurrency(totalBills)} • Coins: {formatCurrency(totalCoins)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyTotal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold text-sm transition-all"
            >
              {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
              {copied ? 'Copied!' : 'Copy Total'}
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold text-sm transition-all"
            >
              <LuRotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bills Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-200 dark:border-slate-800 pb-2">
              Paper Currency (Bills)
            </h3>
            {bills.map(b => (
              <div key={b.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 w-24">
                  {b.name}
                </span>
                <input
                  type="number"
                  min="0"
                  value={counts[b.key] || ''}
                  onChange={(e) => handleChange(b.key, e.target.value)}
                  placeholder="0"
                  className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 w-24 text-right">
                  {formatCurrency((counts[b.key] || 0) * b.val)}
                </span>
              </div>
            ))}
          </div>

          {/* Coins Column */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-200 dark:border-slate-800 pb-2">
              Coins & Change
            </h3>
            {coins.map(c => (
              <div key={c.key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 w-28">
                  {c.name}
                </span>
                <input
                  type="number"
                  min="0"
                  value={counts[c.key] || ''}
                  onChange={(e) => handleChange(c.key, e.target.value)}
                  placeholder="0"
                  className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 w-24 text-right">
                  {formatCurrency((counts[c.key] || 0) * c.val)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CashCalculator;
