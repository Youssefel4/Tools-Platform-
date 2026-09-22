import React, { useState } from 'react';
import { LuCalendar, LuGift, LuClock } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('1998-06-15');

  const calculateAgeDetails = (bDateStr) => {
    if (!bDateStr) return null;
    const birth = new Date(bDateStr);
    const today = new Date();

    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total units
    const diffMs = today.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday
    let nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));

    // Zodiac sign
    const m = birth.getMonth() + 1;
    const d = birth.getDate();
    let zodiac = '';
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) zodiac = 'Aries ♈';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) zodiac = 'Taurus ♉';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) zodiac = 'Gemini ♊';
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) zodiac = 'Cancer ♋';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) zodiac = 'Leo ♌';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) zodiac = 'Virgo ♍';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) zodiac = 'Libra ♎';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) zodiac = 'Scorpio ♏';
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) zodiac = 'Sagittarius ♐';
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) zodiac = 'Capricorn ♑';
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) zodiac = 'Aquarius ♒';
    else zodiac = 'Pisces ♓';

    return { years, months, days, totalDays, totalWeeks, totalHours, daysToNextBday, zodiac };
  };

  const ageData = calculateAgeDetails(birthDate);

  const faqs = [
    {
      question: "How does the age calculator compute exact months and days?",
      answer: "The calculator compares your date of birth against the current date, accounting for varying month lengths (28, 30, or 31 days) and leap years to provide exact elapsed calendar time."
    },
    {
      question: "How is my next birthday countdown determined?",
      answer: "The tool projects your anniversary date into the current or next calendar year and calculates the precise remaining days until that milestone."
    }
  ];

  const howToUse = [
    { title: "Select Birthdate", desc: "Pick your birth day, month, and year from the date selector." },
    { title: "View Chronological Age", desc: "Instantly see your age in years, months, and exact days." },
    { title: "Explore Milestones", desc: "Check your lifetime days lived and the countdown until your next birthday." }
  ];

  return (
    <ToolLayout
      title="Age Calculator"
      subtitle="Calculate your exact age in years, months, and days with next birthday countdown and lifetime stats."
      category="calculators"
      categoryName="Calculators"
      icon={LuCalendar}
      badge="New"
      seoKeywords="age calculator, exact age calculator, birthday countdown, how old am i, days lived calculator"
      seoDescription="Free chronological age calculator. Calculate exact age in years, months, days, total hours lived, and countdown to your next birthday."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['date-calculator', 'time-calculator', 'calculator']}
    >
      <div className="space-y-8 max-w-xl mx-auto">
        <div className="text-center">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Select Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm cursor-pointer"
          />
        </div>

        {ageData && (
          <div className="space-y-6">
            {/* Primary Age Highlight */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-center shadow-xl shadow-blue-500/20">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                Your Exact Chronological Age
              </span>
              <div className="text-4xl sm:text-5xl font-black mt-2 mb-1">
                {ageData.years} <span className="text-xl sm:text-2xl font-light">Years</span>
              </div>
              <div className="text-lg font-medium opacity-95">
                {ageData.months} months, {ageData.days} days
              </div>
            </div>

            {/* Next Birthday & Zodiac */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <LuGift size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Next Birthday</span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    in {ageData.daysToNextBday} days
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                  ★
                </div>
                <div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Zodiac Sign</span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {ageData.zodiac}
                  </div>
                </div>
              </div>
            </div>

            {/* Lifetime Stats */}
            <div className="grid grid-cols-3 gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center">
              <div>
                <span className="text-xs text-slate-500">Days Lived</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {ageData.totalDays.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500">Weeks Lived</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {ageData.totalWeeks.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500">Hours Lived</span>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {ageData.totalHours.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default AgeCalculator;
