import React, { useState } from 'react';
import { LuDollarSign, LuUsers } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('85.00');
  const [tipPercent, setTipPercent] = useState('18');
  const [splitCount, setSplitCount] = useState('2');
  const [roundUp, setRoundUp] = useState(false);

  const bill = parseFloat(billAmount) || 0;
  const tipPct = parseFloat(tipPercent) || 0;
  const people = Math.max(1, parseInt(splitCount, 10) || 1);

  const rawTipAmount = (bill * tipPct) / 100;
  let rawTotal = bill + rawTipAmount;
  let rawPerPersonTotal = rawTotal / people;
  let rawPerPersonTip = rawTipAmount / people;

  if (roundUp) {
    rawPerPersonTotal = Math.ceil(rawPerPersonTotal);
    rawTotal = rawPerPersonTotal * people;
    const finalTotalTip = Math.max(0, rawTotal - bill);
    rawPerPersonTip = finalTotalTip / people;
  }

  const formatUsd = (val) => '$' + Number(val || 0).toFixed(2);

  const presets = ['10', '15', '18', '20', '25'];

  const faqs = [
    {
      question: "What is standard restaurant tipping etiquette?",
      answer: "In the United States and Canada, standard tipping is typically 15% to 20% of the pre-tax bill for good service, with 18% being the most common default."
    },
    {
      question: "How does the round-up feature work?",
      answer: "When enabled, the round-up toggle rounds each diner's final share up to the nearest whole dollar, making it easy to pay with cash or avoid awkward cents."
    }
  ];

  const howToUse = [
    { title: "Input Bill Amount", desc: "Enter the subtotal of your restaurant check or service receipt." },
    { title: "Choose Tip % & Diners", desc: "Pick a standard tip percentage preset or type a custom rate, and enter party size." },
    { title: "Split Instantly", desc: "View the exact per-person share and total tip with optional round-up." }
  ];

  return (
    <ToolLayout
      title="Tip & Bill Splitter"
      subtitle="Quickly calculate tips and split restaurant checks evenly with round-up options."
      category="calculators"
      categoryName="Calculators"
      icon={LuDollarSign}
      badge="New"
      seoKeywords="tip calculator, bill splitter, split bill, restaurant tip, calculate tip"
      seoDescription="Free online tip calculator and bill splitter. Easily compute tip amounts, split totals between friends, and round up to whole dollars."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['percentage-calculator', 'cash-calculator', 'calculator']}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Bill Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Tip Percentage (%)
            </label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTipPercent(p)}
                  className={`py-2 rounded-xl font-bold text-sm transition-all border ${
                    tipPercent === p
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Custom Tip:</span>
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500">%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Number of People
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSplitCount(Math.max(1, people - 1).toString())}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={splitCount}
                  onChange={(e) => setSplitCount(e.target.value)}
                  className="w-20 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setSplitCount((people + 1).toString())}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={roundUp}
                  onChange={(e) => setRoundUp(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Round Up Per Person
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-500/20 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Total Per Person
            </span>
            <div className="text-4xl sm:text-5xl font-black my-2">
              {formatUsd(rawPerPersonTotal)}
            </div>
            <div className="text-sm opacity-90 font-medium">
              Includes {formatUsd(rawPerPersonTip)} tip each
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Total Tip ({tipPct}%):</span>
                <span className="font-bold">{formatUsd(rawTipAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-90">Total Bill with Tip:</span>
                <span className="font-bold text-lg">{formatUsd(rawTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TipCalculator;
