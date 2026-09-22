import React, { useState } from 'react';
import { LuLandmark, LuDollarSign } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('70000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTermYears, setLoanTermYears] = useState('30');
  const [propertyTaxYearly, setPropertyTaxYearly] = useState('3600');
  const [homeInsuranceYearly, setHomeInsuranceYearly] = useState('1200');

  const price = parseFloat(homePrice) || 0;
  const down = parseFloat(downPayment) || 0;
  const principal = Math.max(0, price - down);
  const rate = (parseFloat(interestRate) || 0) / 100 / 12;
  const n = (parseFloat(loanTermYears) || 30) * 12;

  let monthlyPI = 0;
  if (rate > 0 && n > 0 && principal > 0) {
    monthlyPI = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  } else if (n > 0 && principal > 0) {
    monthlyPI = principal / n;
  }

  const monthlyTax = (parseFloat(propertyTaxYearly) || 0) / 12;
  const monthlyIns = (parseFloat(homeInsuranceYearly) || 0) / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyIns;
  const totalLoanRepayment = monthlyPI * n;
  const totalInterest = Math.max(0, totalLoanRepayment - principal);

  const formatCurrency = (val) => '$' + Number(val || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const faqs = [
    {
      question: "How is a monthly mortgage payment calculated?",
      answer: "A fixed-rate monthly mortgage payment uses the formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1], where M is monthly payment, P is principal loan amount, i is monthly interest rate, and n is total number of monthly payments."
    },
    {
      question: "What is PITI in mortgage planning?",
      answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These four components together comprise your true monthly housing payment."
    },
    {
      question: "How does down payment affect my monthly payment?",
      answer: "A higher down payment reduces your loan principal, which decreases your monthly interest charge and overall repayment total over the life of the loan."
    }
  ];

  const howToUse = [
    { title: "Input Home Price & Down Payment", desc: "Enter the total property cost and the initial down payment you plan to provide." },
    { title: "Set Loan Terms & Rates", desc: "Provide the expected annual interest rate % and loan duration (typically 15 or 30 years)." },
    { title: "Review Monthly Costs", desc: "Instantly inspect your total monthly payment broken down by principal, interest, taxes, and insurance." }
  ];

  return (
    <ToolLayout
      title="Mortgage & Loan Calculator"
      subtitle="Estimate monthly mortgage payments, interest costs, loan terms, and total payoff breakdown."
      category="calculators"
      categoryName="Calculators"
      icon={LuLandmark}
      badge="Finance"
      seoKeywords="mortgage calculator, loan calculator, monthly mortgage payment, interest rate calculator"
      seoDescription="Free online mortgage calculator. Calculate monthly payments, interest costs, loan payoff schedules, and property taxes with zero hassle."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['compound-interest-calculator', 'percentage-calculator', 'calculator']}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Home Price ($)
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Down Payment ($)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="30">30 Years</option>
                <option value="20">20 Years</option>
                <option value="15">15 Years</option>
                <option value="10">10 Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Annual Property Tax ($)
              </label>
              <input
                type="number"
                value={propertyTaxYearly}
                onChange={(e) => setPropertyTaxYearly(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Annual Homeowners Insurance ($)
              </label>
              <input
                type="number"
                value={homeInsuranceYearly}
                onChange={(e) => setHomeInsuranceYearly(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/60 dark:to-slate-900/60 p-6 sm:p-8 rounded-3xl border border-blue-200/80 dark:border-blue-900/50 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
              Estimated Total Monthly Payment
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white my-3">
              {formatCurrency(totalMonthly)}
              <span className="text-base font-normal text-slate-500">/mo</span>
            </div>

            <div className="space-y-3 mt-6 pt-6 border-t border-blue-200/60 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Principal & Interest:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(monthlyPI)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Property Taxes:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(monthlyTax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Home Insurance:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(monthlyIns)}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-blue-200/40 dark:border-slate-700 font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Total Loan Principal:</span>
                <span className="text-slate-900 dark:text-white">{formatCurrency(principal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Total Interest Paid:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{formatCurrency(totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MortgageCalculator;
