import React, { useState } from 'react';
import { LuScale } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  
  // Metric
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');

  // Imperial
  const [heightFeet, setHeightFeet] = useState('5');
  const [heightInches, setHeightInches] = useState('9');
  const [weightLbs, setWeightLbs] = useState('155');

  // Calculate BMI
  let bmi = 0;
  let healthyMinKg = 0;
  let healthyMaxKg = 0;

  if (unit === 'metric') {
    const hM = parseFloat(heightCm) / 100;
    const wKg = parseFloat(weightKg);
    if (hM > 0 && wKg > 0) {
      bmi = wKg / (hM * hM);
      healthyMinKg = (18.5 * hM * hM).toFixed(1);
      healthyMaxKg = (24.9 * hM * hM).toFixed(1);
    }
  } else {
    const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
    const wLbs = parseFloat(weightLbs) || 0;
    if (totalInches > 0 && wLbs > 0) {
      bmi = (wLbs / (totalInches * totalInches)) * 703;
      healthyMinKg = ((18.5 * totalInches * totalInches) / 703).toFixed(1);
      healthyMaxKg = ((24.9 * totalInches * totalInches) / 703).toFixed(1);
    }
  }

  const getBmiCategory = (score) => {
    if (score < 18.5) return { label: 'Underweight', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-950/60', border: 'border-amber-300 dark:border-amber-800' };
    if (score < 25) return { label: 'Normal / Healthy Weight', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-950/60', border: 'border-emerald-300 dark:border-emerald-800' };
    if (score < 30) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-950/60', border: 'border-orange-300 dark:border-orange-800' };
    return { label: 'Obese', color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-950/60', border: 'border-rose-300 dark:border-rose-800' };
  };

  const category = getBmiCategory(bmi);
  const formattedBmi = bmi > 0 ? bmi.toFixed(1) : '0.0';

  const faqs = [
    {
      question: "What is a healthy BMI range for adults?",
      answer: "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal/healthy weight for adult men and women."
    },
    {
      question: "What is the formula for calculating BMI?",
      answer: "In metric units: BMI = Weight (kg) / [Height (m)]². In imperial units: BMI = (Weight (lbs) / [Height (inches)]²) * 703."
    },
    {
      question: "Does BMI differentiate between muscle and fat?",
      answer: "BMI does not distinguish between muscle mass and adipose tissue. Highly athletic individuals or bodybuilders may have a high BMI despite having low body fat."
    }
  ];

  const howToUse = [
    { title: "Select Unit System", desc: "Choose between Metric (cm, kg) or Imperial (feet, inches, lbs)." },
    { title: "Enter Height & Weight", desc: "Input your height and current body weight." },
    { title: "Review Category", desc: "Instantly view your BMI score, classification, and recommended healthy weight range." }
  ];

  return (
    <ToolLayout
      title="BMI Calculator"
      subtitle="Free Body Mass Index (BMI) calculator with metric and imperial units for adult men and women."
      category="calculators"
      categoryName="Calculators"
      icon={LuScale}
      badge="Health"
      seoKeywords="bmi calculator, body mass index, healthy weight calculator, adult bmi"
      seoDescription="Free Body Mass Index (BMI) calculator for men and women. Check your BMI score, weight classification, and healthy weight range instantly."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['calorie-calculator', 'unit-converter', 'calculator']}
    >
      <div className="space-y-8">
        {/* Unit Selector */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setUnit('metric')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                unit === 'metric'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Metric (cm, kg)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                unit === 'imperial'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Imperial (ft, in, lbs)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="175"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="70"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Feet"
                  />
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Inches"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="155"
                />
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className={`p-8 rounded-3xl border text-center max-w-lg mx-auto ${category.bg} ${category.border}`}>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
            Your Body Mass Index (BMI)
          </span>
          <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white my-3">
            {formattedBmi}
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full font-bold text-sm mb-4 ${category.color} bg-white dark:bg-slate-900 shadow-sm`}>
            {category.label}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Recommended healthy weight range: <span className="font-bold text-slate-900 dark:text-white">{healthyMinKg} – {healthyMaxKg} {unit === 'metric' ? 'kg' : 'lbs'}</span>
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BMICalculator;
