import React, { useState } from 'react';
import { LuTrendingUp, LuDollarSign } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CompoundInterestCalculator = () => {
  const [initialPrincipal, setInitialPrincipal] = useState('10000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('500');
  const [interestRate, setInterestRate] = useState('8');
  const [investmentYears, setInvestmentYears] = useState('10');
  const [compoundFreq, setCompoundFreq] = useState('12'); // 12 = monthly, 1 = annually

  const P = parseFloat(initialPrincipal) || 0;
  const PMT = parseFloat(monthlyDeposit) || 0;
  const r = (parseFloat(interestRate) || 0) / 100;
  const t = parseFloat(investmentYears) || 0;
  const n = parseFloat(compoundFreq) || 12;

  // Yearly projection table
  const yearlyData = [];
  let currentBalance = P;
  let totalDeposited = P;

  for (let yr = 1; yr <= Math.min(50, t); yr++) {
    for (let m = 1; m <= 12; m++) {
      currentBalance += PMT;
      totalDeposited += PMT;
      // Monthly interest compounding approximation
      currentBalance += currentBalance * (r / 12);
    }
    yearlyData.push({
      year: yr,
      balance: Math.round(currentBalance),
      contributions: Math.round(totalDeposited),
      interestEarned: Math.round(currentBalance - totalDeposited)
    });
  }

  const finalBalance = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].balance : P;
  const finalDeposited = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].contributions : P;
  const finalInterest = Math.max(0, finalBalance - finalDeposited);

  const formatCurrency = (val) => '$' + Number(val || 0).toLocaleString('en-US');

  const faqs = [
    {
      question: "What is the compound interest formula?",
      answer: "The standard formula for compound interest with regular deposits is: A = P(1 + r/n)^(nt) + PMT * [ ((1 + r/n)^(nt) - 1) / (r/n) ], where P is initial principal, PMT is periodic deposit, r is annual interest rate, n is compounding frequency, and t is time in years."
    },
    {
      question: "How does compounding frequency affect investment returns?",
      answer: "The more frequently interest is compounded (e.g. monthly vs annually), the faster your wealth accumulates because you earn interest on previously accrued interest sooner."
    }
  ];

  const howToUse = [
    { title: "Set Initial Principal", desc: "Enter your current starting investment or savings balance." },
    { title: "Add Recurring Deposits & Rate", desc: "Input how much you plan to save monthly and your expected annual return rate." },
    { title: "Review Growth Schedule", desc: "Inspect your future net worth and total interest earned year by year." }
  ];

  return (
    <ToolLayout
      title="Compound Interest Calculator"
      subtitle="Simulate investment growth, regular monthly deposits, and interest acceleration over time."
      category="calculators"
      categoryName="Calculators"
      icon={LuTrendingUp}
      badge="Finance"
      seoKeywords="compound interest calculator, investment calculator, compound growth, savings interest, future value"
      seoDescription="Free compound interest calculator. Calculate future investment value, compounding interest, monthly contributions, and yearly wealth accumulation."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['mortgage-calculator', 'percentage-calculator', 'calculator']}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={initialPrincipal}
              onChange={(e) => setInitialPrincipal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Monthly Deposit ($)
            </label>
            <input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Time Horizon (Years)
            </label>
            <input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Primary Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/20 text-center">
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">Future Balance</span>
            <div className="text-3xl sm:text-4xl font-black mt-2">
              {formatCurrency(finalBalance)}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Total Contributions</span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {formatCurrency(finalDeposited)}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">Total Interest Earned</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
              {formatCurrency(finalInterest)}
            </div>
          </div>
        </div>

        {/* Year-by-Year Growth Table */}
        {yearlyData.length > 0 && (
          <div className="mt-8 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-800">
              Year-by-Year Accumulation Breakdown
            </div>
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100/50 dark:bg-slate-800/80 text-slate-500 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Year</th>
                    <th className="py-2.5 px-4">Total Deposited</th>
                    <th className="py-2.5 px-4">Interest Earned</th>
                    <th className="py-2.5 px-4">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 px-4 font-semibold">Year {row.year}</td>
                      <td className="py-2 px-4">{formatCurrency(row.contributions)}</td>
                      <td className="py-2 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        +{formatCurrency(row.interestEarned)}
                      </td>
                      <td className="py-2 px-4 font-bold text-slate-900 dark:text-white">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default CompoundInterestCalculator;
