import React, { useState } from 'react';
import { LuCalendar, LuClock, LuPlus, LuMinus } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const DateCalculator = () => {
  const [mode, setMode] = useState('between'); // 'between' or 'addSubtract'

  // Mode 1: Between
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Mode 2: Add / Subtract
  const [baseDate, setBaseDate] = useState(todayStr);
  const [operation, setOperation] = useState('add');
  const [qty, setQty] = useState('14');
  const [unit, setUnit] = useState('days');

  // Mode 1 calculation
  let diffDays = 0;
  let businessDays = 0;
  let diffWeeks = 0;
  if (startDate && endDate) {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
    diffWeeks = (diffDays / 7).toFixed(1);

    // Business days count
    let cur = new Date(Math.min(d1.getTime(), d2.getTime()));
    const end = new Date(Math.max(d1.getTime(), d2.getTime()));
    while (cur < end) {
      cur.setDate(cur.getDate() + 1);
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
    }
  }

  // Mode 2 calculation
  let computedDateStr = '';
  if (baseDate && qty) {
    const d = new Date(baseDate);
    const val = parseInt(qty, 10) * (operation === 'add' ? 1 : -1);
    if (!isNaN(val)) {
      if (unit === 'days') d.setDate(d.getDate() + val);
      else if (unit === 'weeks') d.setDate(d.getDate() + val * 7);
      else if (unit === 'months') d.setMonth(d.getMonth() + val);
      else if (unit === 'years') d.setFullYear(d.getFullYear() + val);
      computedDateStr = d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  const faqs = [
    {
      question: "How are business days calculated?",
      answer: "Business days include Monday through Friday, automatically excluding standard weekend days (Saturday and Sunday)."
    },
    {
      question: "Can I add or subtract months and leap years?",
      answer: "Yes, our calculator automatically handles leap year February days (29 days) and variable month lengths (28, 30, or 31 days)."
    }
  ];

  const howToUse = [
    { title: "Select Calculation Mode", desc: "Choose between finding days between two dates or adding/subtracting duration from a date." },
    { title: "Pick Dates & Units", desc: "Input start date, target date, or amount of days, weeks, or months." },
    { title: "View Calendar Breakdown", desc: "See total calendar days, working business days, and the exact destination date." }
  ];

  return (
    <ToolLayout
      title="Date Difference Calculator"
      subtitle="Calculate total days, weeks, and business days between dates or add/subtract time."
      category="calculators"
      categoryName="Calculators"
      icon={LuClock}
      badge="New"
      seoKeywords="date calculator, days between dates, date difference, business days calculator, add days to date"
      seoDescription="Free online date calculator. Calculate days, weeks, and business days between two dates or add/subtract days from any calendar date."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['age-calculator', 'time-calculator', 'countdown-timer']}
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('between')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'between'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Days Between Two Dates
            </button>
            <button
              onClick={() => setMode('addSubtract')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'addSubtract'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Add or Subtract Days
            </button>
          </div>
        </div>

        {mode === 'between' ? (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Total Elapsed Time
              </span>
              <div className="text-5xl font-black text-blue-600 dark:text-blue-400 my-2">
                {diffDays} <span className="text-2xl font-light text-slate-600 dark:text-slate-400">Days</span>
              </div>
              <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm">
                <div>
                  <span className="text-slate-500">Business Days:</span>{' '}
                  <span className="font-bold text-slate-900 dark:text-white">{businessDays} days</span>
                </div>
                <div>
                  <span className="text-slate-500">Weeks:</span>{' '}
                  <span className="font-bold text-slate-900 dark:text-white">{diffWeeks} weeks</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Base Date
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Operation
                </label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="add">+ Add</option>
                  <option value="subtract">− Subtract</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-purple-50 dark:bg-purple-950/20 border border-[#804DF2]/20 dark:border-[#804DF2]/30 text-center">
              <span className="text-xs uppercase tracking-wider font-bold text-[#804DF2] dark:text-[#a782f7]">
                Calculated Date
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                {computedDateStr || '—'}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default DateCalculator;
