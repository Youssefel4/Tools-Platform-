import React, { useState } from 'react';
import { LuClock, LuPlus, LuMinus } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TimeCalculator = () => {
  const [tab, setTab] = useState('addSubtract'); // 'addSubtract' or 'duration'

  // Tab 1: Add/Subtract
  const [h1, setH1] = useState('4');
  const [m1, setM1] = useState('30');
  const [s1, setS1] = useState('0');
  const [op, setOp] = useState('add');
  const [h2, setH2] = useState('2');
  const [m2, setM2] = useState('45');
  const [s2, setS2] = useState('0');

  // Tab 2: Clock duration
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:30');

  // Tab 1 calculation
  const totalSec1 = (parseInt(h1, 10) || 0) * 3600 + (parseInt(m1, 10) || 0) * 60 + (parseInt(s1, 10) || 0);
  const totalSec2 = (parseInt(h2, 10) || 0) * 3600 + (parseInt(m2, 10) || 0) * 60 + (parseInt(s2, 10) || 0);
  const resultSec = op === 'add' ? totalSec1 + totalSec2 : Math.max(0, totalSec1 - totalSec2);

  const resH = Math.floor(resultSec / 3600);
  const resM = Math.floor((resultSec % 3600) / 60);
  const resS = resultSec % 60;
  const resDecimalHours = (resultSec / 3600).toFixed(2);

  // Tab 2 calculation
  let durH = 0;
  let durM = 0;
  let durDecimal = '0.00';
  if (startTime && endTime) {
    const [startH, startMin] = startTime.split(':').map(Number);
    const [endH, endMin] = endTime.split(':').map(Number);
    let sMin = startH * 60 + startMin;
    let eMin = endH * 60 + endMin;
    if (eMin < sMin) eMin += 24 * 60; // Next day
    const diffMin = eMin - sMin;
    durH = Math.floor(diffMin / 60);
    durM = diffMin % 60;
    durDecimal = (diffMin / 60).toFixed(2);
  }

  const faqs = [
    {
      question: "How do I convert minutes into decimal hours for payroll?",
      answer: "Divide the number of minutes by 60. For example, 45 minutes / 60 = 0.75 hours. 8 hours and 45 minutes equals 8.75 decimal hours."
    },
    {
      question: "Can this calculate overnight shifts across midnight?",
      answer: "Yes, our Clock Duration calculator automatically accounts for overnight periods where the end time is past midnight."
    }
  ];

  const howToUse = [
    { title: "Choose Time Calculation Mode", desc: "Select between adding/subtracting hours and minutes or calculating work shift duration." },
    { title: "Input Times", desc: "Enter hours, minutes, and clock times." },
    { title: "Get Decimal & Standard Time", desc: "Instantly view standard time and decimal hours formatted for timesheets." }
  ];

  return (
    <ToolLayout
      title="Time Calculator"
      subtitle="Add or subtract hours, minutes, and seconds or calculate work shift duration."
      category="calculators"
      categoryName="Calculators"
      icon={LuClock}
      badge="Popular"
      seoKeywords="time calculator, add time, subtract time, work hours calculator, timesheet calculator, hours between times"
      seoDescription="Free online time calculator. Add and subtract hours, minutes, and seconds or calculate elapsed work hours for timesheets and payroll."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['date-calculator', 'countdown-timer', 'calculator']}
    >
      <div className="space-y-8 max-w-xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTab('addSubtract')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'addSubtract'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Add / Subtract Time
            </button>
            <button
              onClick={() => setTab('duration')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'duration'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Clock Shift Duration
            </button>
          </div>
        </div>

        {tab === 'addSubtract' ? (
          <div className="space-y-6">
            {/* Time 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 mb-2 block">Time 1</span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Hours</label>
                  <input
                    type="number"
                    value={h1}
                    onChange={(e) => setH1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Minutes</label>
                  <input
                    type="number"
                    value={m1}
                    onChange={(e) => setM1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Seconds</label>
                  <input
                    type="number"
                    value={s1}
                    onChange={(e) => setS1(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Operator */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setOp('add')}
                  className={`px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 ${
                    op === 'add' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <LuPlus size={16} /> Add
                </button>
                <button
                  type="button"
                  onClick={() => setOp('subtract')}
                  className={`px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1 ${
                    op === 'subtract' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <LuMinus size={16} /> Subtract
                </button>
              </div>
            </div>

            {/* Time 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 mb-2 block">Time 2</span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Hours</label>
                  <input
                    type="number"
                    value={h2}
                    onChange={(e) => setH2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Minutes</label>
                  <input
                    type="number"
                    value={m2}
                    onChange={(e) => setM2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Seconds</label>
                  <input
                    type="number"
                    value={s2}
                    onChange={(e) => setS2(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="p-8 rounded-3xl bg-[#804DF2] text-white text-center shadow-xl shadow-[#804DF2]/20">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">Total Calculated Time</span>
              <div className="text-4xl sm:text-5xl font-black mt-2">
                {resH}h {resM}m {resS}s
              </div>
              <div className="text-sm font-semibold opacity-90 mt-2">
                = {resDecimalHours} decimal hours
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Start Clock Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  End Clock Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                Elapsed Working Shift
              </span>
              <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 mt-2">
                {durH} hrs {durM} mins
              </div>
              <div className="text-sm font-semibold text-slate-500 mt-2">
                Total: <span className="font-bold text-slate-900 dark:text-white">{durDecimal} hours</span> for timesheet
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TimeCalculator;
