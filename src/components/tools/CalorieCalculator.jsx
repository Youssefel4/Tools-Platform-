import React, { useState } from 'react';
import { LuFlame } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CalorieCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('28');
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('75');
  const [activity, setActivity] = useState('1.375'); // Light exercise

  const a = parseFloat(age) || 25;
  const h = parseFloat(heightCm) || 170;
  const w = parseFloat(weightKg) || 70;
  const act = parseFloat(activity) || 1.2;

  // Mifflin-St Jeor formula
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  const tdee = Math.round(bmr * act);
  const mildLoss = Math.max(1200, Math.round(tdee - 250));
  const standardLoss = Math.max(1200, Math.round(tdee - 500));
  const muscleGain = Math.round(tdee + 350);

  const faqs = [
    {
      question: "What is BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the minimum calories your body burns at rest to sustain basic vital organs. TDEE (Total Daily Energy Expenditure) is your total daily calorie burn factoring in your physical activity level."
    },
    {
      question: "Which formula does this calorie calculator use?",
      answer: "This tool uses the clinically validated Mifflin-St Jeor equation, recognized as the most accurate standard formula for estimating resting metabolic rate in healthy individuals."
    },
    {
      question: "How many calories should I cut to lose weight?",
      answer: "A safe and sustainable calorie deficit is 300 to 500 calories below your TDEE, which typically translates to approximately 0.5 to 1 pound (0.25 to 0.5 kg) of fat loss per week."
    }
  ];

  const howToUse = [
    { title: "Enter Body Metrics", desc: "Select your gender, age, height, and current weight." },
    { title: "Select Daily Activity", desc: "Pick your typical physical activity frequency from sedentary to intense athlete." },
    { title: "View Calorie Targets", desc: "Get targeted calorie plans for maintenance, sustainable fat loss, and muscle growth." }
  ];

  return (
    <ToolLayout
      title="Calorie & BMR Calculator"
      subtitle="Find your daily caloric needs for weight maintenance, healthy fat loss, and muscle growth."
      category="calculators"
      categoryName="Calculators"
      icon={LuFlame}
      badge="Health"
      seoKeywords="calorie calculator, bmr calculator, daily calories, weight loss calories, tdee calculator"
      seoDescription="Free online calorie and BMR calculator. Accurately calculate daily caloric needs for maintenance, fat loss, or muscle gain using the Mifflin-St Jeor formula."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['bmi-calculator', 'unit-converter', 'calculator']}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Biological Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                  gender === 'male'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                  gender === 'female'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1.2">Sedentary (Little or no exercise, desk job)</option>
              <option value="1.375">Lightly Active (Exercise 1–3 days/week)</option>
              <option value="1.55">Moderately Active (Exercise 3–5 days/week)</option>
              <option value="1.725">Very Active (Hard exercise 6–7 days/week)</option>
              <option value="1.9">Extra Active (Intense training / physical job)</option>
            </select>
          </div>
        </div>

        {/* Results Targets */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500">Weight Maintenance (TDEE)</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{tdee} kcal / day</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
              100%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400">Mild Weight Loss (-0.25 kg/wk)</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{mildLoss} kcal / day</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              -250 kcal
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-600 dark:text-amber-400">Standard Fat Loss (-0.5 kg/wk)</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{standardLoss} kcal / day</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              -500 kcal
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-purple-600 dark:text-purple-400">Muscle Growth & Bulking</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{muscleGain} kcal / day</div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              +350 kcal
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CalorieCalculator;
