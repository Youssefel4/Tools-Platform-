import React, { useState } from 'react';
import { LuGraduationCap, LuPlus, LuTrash2 } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const GradeCalculator = () => {
  const [tab, setTab] = useState('gpa'); // 'gpa' or 'final'

  // GPA State
  const [courses, setCourses] = useState([
    { id: 1, name: 'Course 1', grade: '4.0', credits: '3' },
    { id: 2, name: 'Course 2', grade: '3.7', credits: '4' },
    { id: 3, name: 'Course 3', grade: '3.3', credits: '3' },
    { id: 4, name: 'Course 4', grade: '4.0', credits: '3' }
  ]);

  // Final Grade State
  const [currentGrade, setCurrentGrade] = useState('85');
  const [targetGrade, setTargetGrade] = useState('90');
  const [finalWeight, setFinalWeight] = useState('25');

  // GPA Calculation
  const gradePoints = {
    '4.0': 'A (4.0)',
    '3.7': 'A- (3.7)',
    '3.3': 'B+ (3.3)',
    '3.0': 'B (3.0)',
    '2.7': 'B- (2.7)',
    '2.3': 'C+ (2.3)',
    '2.0': 'C (2.0)',
    '1.7': 'C- (1.7)',
    '1.0': 'D (1.0)',
    '0.0': 'F (0.0)'
  };

  let totalCredits = 0;
  let totalGradePoints = 0;
  courses.forEach(c => {
    const cred = parseFloat(c.credits) || 0;
    const pts = parseFloat(c.grade) || 0;
    totalCredits += cred;
    totalGradePoints += pts * cred;
  });
  const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: `Course ${courses.length + 1}`, grade: '4.0', credits: '3' }]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id, field, val) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  // Final Grade Needed Calculation
  // target = (current * (100 - weight) + finalNeeded * weight) / 100
  // finalNeeded = (target * 100 - current * (100 - weight)) / weight
  const curr = parseFloat(currentGrade) || 0;
  const targ = parseFloat(targetGrade) || 0;
  const wt = parseFloat(finalWeight) || 0;
  let finalExamNeeded = 0;
  if (wt > 0) {
    finalExamNeeded = ((targ * 100) - (curr * (100 - wt))) / wt;
  }

  const faqs = [
    {
      question: "How is college GPA calculated?",
      answer: "Each course's letter grade corresponds to grade points (e.g. A = 4.0, B = 3.0). Multiply each grade point by the course credit hours, sum all the products, and divide by the total number of credit hours."
    },
    {
      question: "What score do I need on my final exam to pass?",
      answer: "Use our Final Grade Calculator mode! Enter your current class grade, your desired final course grade, and the weight percentage of the final exam to compute the exact score required."
    }
  ];

  const howToUse = [
    { title: "Select GPA or Final Exam", desc: "Choose whether you are calculating cumulative semester GPA or final exam grade requirements." },
    { title: "Add Courses & Credits", desc: "Input course names, credit values, and letter grades." },
    { title: "Review Grade Metrics", desc: "Instantly see your calculated GPA on the 4.0 scale or target score needed." }
  ];

  return (
    <ToolLayout
      title="Grade & GPA Calculator"
      subtitle="Calculate semester GPA on a 4.0 scale or find the score needed on your final exam."
      category="calculators"
      categoryName="Calculators"
      icon={LuGraduationCap}
      badge="Academic"
      seoKeywords="gpa calculator, grade calculator, final exam calculator, college gpa, final grade needed"
      seoDescription="Free GPA and Grade Calculator. Calculate 4.0 scale semester GPA and determine the exact score needed on your final exam to achieve your target grade."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['percentage-calculator', 'calculator', 'notes']}
    >
      <div className="space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTab('gpa')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'gpa'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Semester GPA Calculator
            </button>
            <button
              onClick={() => setTab('final')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'final'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Final Exam Score Needed
            </button>
          </div>
        </div>

        {tab === 'gpa' ? (
          <div className="space-y-6">
            <div className="space-y-3">
              {courses.map((c, idx) => (
                <div key={c.id} className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
                    className="flex-grow px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Course ${idx + 1}`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Grade:</span>
                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(gradePoints).map(([pts, label]) => (
                        <option key={pts} value={pts}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Credits:</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, 'credits', e.target.value)}
                      className="w-16 px-2.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-center text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removeCourse(c.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove Course"
                  >
                    <LuTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={addCourse}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                <LuPlus size={16} /> Add Course
              </button>
              <div className="text-sm text-slate-500">
                Total Credits: <span className="font-bold text-slate-900 dark:text-white">{totalCredits}</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#804DF2] text-white text-center shadow-xl shadow-[#804DF2]/20 max-w-sm mx-auto">
              <span className="text-xs uppercase font-bold tracking-wider opacity-90">
                Your Cumulative GPA
              </span>
              <div className="text-5xl font-black mt-2">
                {gpa} <span className="text-2xl font-light opacity-80">/ 4.0</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Grade (%)
                </label>
                <input
                  type="number"
                  value={currentGrade}
                  onChange={(e) => setCurrentGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="85"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Course Grade (%)
                </label>
                <input
                  type="number"
                  value={targetGrade}
                  onChange={(e) => setTargetGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="90"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Final Exam Weight (%)
                </label>
                <input
                  type="number"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="25"
                />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                Score Needed on Final Exam
              </span>
              <div className={`text-5xl font-black mt-2 ${
                finalExamNeeded > 100
                  ? 'text-rose-500'
                  : 'text-blue-600 dark:text-blue-400'
              }`}>
                {finalExamNeeded.toFixed(1)}%
              </div>
              {finalExamNeeded > 100 && (
                <p className="text-xs text-rose-500 font-semibold mt-2">
                  Extra credit will be required to reach this target.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default GradeCalculator;
