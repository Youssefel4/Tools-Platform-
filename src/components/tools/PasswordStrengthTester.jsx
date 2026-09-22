import React, { useState } from 'react';
import { LuShieldCheck, LuEye, LuEyeOff, LuCheck, LuX, LuLock } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const PasswordStrengthTester = () => {
  const [password, setPassword] = useState('Tr0ub4dor&3#2026!');
  const [showPassword, setShowPassword] = useState(true);

  // Criteria calculations
  const hasMinLength = password.length >= 12;
  const hasOptimalLength = password.length >= 16;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Entropy Calculation: E = L * log2(R)
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;

  const entropy = poolSize > 0 && password.length > 0
    ? Math.round(password.length * Math.log2(poolSize))
    : 0;

  // Crack Time Estimation (based on 100 billion guesses/second)
  const getCrackTime = (bits) => {
    if (bits < 28) return 'Instantly (< 1 sec)';
    if (bits < 36) return 'A few seconds';
    if (bits < 50) return 'Several hours';
    if (bits < 60) return 'A few weeks';
    if (bits < 75) return 'Several years';
    if (bits < 90) return 'Centuries';
    return 'Over 100 million years';
  };

  const getStrengthRating = (bits) => {
    if (bits < 40) return { label: 'Very Weak', color: 'bg-rose-500', text: 'text-rose-500', width: '20%' };
    if (bits < 55) return { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-500', width: '40%' };
    if (bits < 75) return { label: 'Fair / Moderate', color: 'bg-amber-500', text: 'text-amber-500', width: '65%' };
    if (bits < 95) return { label: 'Strong', color: 'bg-blue-500', text: 'text-blue-500', width: '85%' };
    return { label: 'Military-Grade Unbreakable', color: 'bg-emerald-500', text: 'text-emerald-500', width: '100%' };
  };

  const strength = getStrengthRating(entropy);
  const crackTime = getCrackTime(entropy);

  const faqs = [
    {
      question: "How is password entropy calculated?",
      answer: "Entropy measures mathematical randomness in bits: Entropy = Length × log₂(Character Pool Size). For example, a 16-character password using all 94 ASCII symbols provides ~105 bits of entropy."
    },
    {
      question: "Why does length matter more than complex symbols?",
      answer: "Each additional character multiplies the total combinatorial possibilities exponentially. Adding 4 random characters expands the search space by over 78 million times!"
    }
  ];

  const howToUse = [
    { title: "Type or Paste Password", desc: "Type your password into the input box to evaluate." },
    { title: "Review Entropy & Crack Time", desc: "View real-time entropy bits and estimated brute-force crack time." },
    { title: "Follow Security Checklist", desc: "Check if your key satisfies length, character mix, and uniqueness criteria." }
  ];

  return (
    <ToolLayout
      title="Password Strength Tester"
      subtitle="Audit password entropy, estimate brute-force cracking times, and check security criteria."
      category="developer"
      categoryName="Developer Tools"
      icon={LuShieldCheck}
      badge="Security"
      seoKeywords="password strength tester, check password security, password meter, password crack time, entropy calculator"
      seoDescription="Free online password strength tester. Calculate password entropy in bits, estimate brute force crack time, and audit credential security."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['password-generator', 'hash-generator', 'regex-tester']}
      blogSlug="12-vs-16-character-passwords-security-comparison"
      blogTitle="12-Character vs 16-Character Passwords: Which One Is Actually Secure?"
    >
      <div className="space-y-8 max-w-xl mx-auto">
        {/* Password Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Enter Password to Audit
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 pr-12 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type password..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
          </div>
        </div>

        {/* Strength Rating Bar */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase font-bold text-slate-500">Strength Rating</span>
            <span className={`text-sm font-black ${strength.text}`}>{strength.label}</span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              style={{ width: strength.width }}
              className={`h-full transition-all duration-500 ${strength.color}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-center">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Calculated Entropy</span>
              <span className="font-bold text-xl text-slate-900 dark:text-white">{entropy} bits</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Est. Brute-Force Time</span>
              <span className="font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400 truncate block mt-0.5">
                {crackTime}
              </span>
            </div>
          </div>
        </div>

        {/* Criteria Checklist */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Security Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              hasMinLength
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 text-slate-400'
            }`}>
              {hasMinLength ? <LuCheck size={16} /> : <LuX size={16} />} 12+ Characters Length
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              hasOptimalLength
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 text-slate-400'
            }`}>
              {hasOptimalLength ? <LuCheck size={16} /> : <LuX size={16} />} 16+ Optimal Defense
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              hasLower && hasUpper
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 text-slate-400'
            }`}>
              {hasLower && hasUpper ? <LuCheck size={16} /> : <LuX size={16} />} Mixed Upper & Lower
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2 ${
              hasNumber && hasSymbol
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 text-slate-400'
            }`}>
              {hasNumber && hasSymbol ? <LuCheck size={16} /> : <LuX size={16} />} Numbers & Symbols
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PasswordStrengthTester;
