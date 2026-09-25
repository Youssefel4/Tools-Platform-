import React, { useState } from 'react';
import { LuKey, LuCopy, LuCheck, LuRefreshCw, LuShieldCheck } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      return;
    }

    // Secure browser crypto random values
    let newPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(array[i] % charset.length);
    }

    setPassword(newPassword);
    setHistory(prev => [newPassword, ...prev.slice(0, 4)]);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'Empty', color: 'bg-slate-300' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score += 2;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 25, text: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score: 50, text: 'Moderate', color: 'bg-amber-500' };
    if (score <= 5) return { score: 75, text: 'Strong', color: 'bg-blue-500' };
    return { score: 100, text: 'Very Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrength(password);

  const faqs = [
    {
      question: "What makes a password truly strong?",
      answer: "A strong password has at least 16 characters and mixes uppercase letters, lowercase letters, numbers, and symbols without forming recognizable dictionary words or personal information."
    },
    {
      question: "Are the generated passwords stored or sent over the internet?",
      answer: "Never. Passwords are generated strictly inside your browser's local memory using the Web Crypto API. Nothing is sent to our servers."
    },
    {
      question: "Why is 16 characters recommended over 8 or 12?",
      answer: "Modern brute-force hardware with multi-GPU rigs can crack 8-character passwords in minutes. A 16-character complex password requires quintillions of years to crack."
    },
    {
      question: "How should I store my strong passwords?",
      answer: "We strongly recommend using an encrypted open-source or commercial password manager (such as Bitwarden, 1Password, or KeePass) rather than writing passwords in plain text."
    }
  ];

  const howToUse = [
    { title: "Select Length", desc: "Choose your desired length between 8 and 64 characters (16+ recommended for critical accounts)." },
    { title: "Choose Character Types", desc: "Toggle uppercase letters, lowercase letters, numbers, and special symbols to match your security policy." },
    { title: "Generate & Copy", desc: "Click Generate, check the real-time strength score, and copy your secure password with one click." }
  ];

  const features = [
    { title: "Cryptographic Randomness", desc: "Generated using browser Web Crypto APIs for true entropy." },
    { title: "Zero Data Logging", desc: "Passwords are never saved, transmitted, or logged remotely." },
    { title: "Entropy Rating", desc: "Real-time brute force resilience meter ensures optimal complexity." }
  ];

  return (
    <ToolLayout
      title="Strong Password Generator"
      subtitle="Generate ultra-secure, cryptographically random passwords with customizable length, symbols, and numbers."
      category="developer"
      categoryName="Developer Tools"
      icon={LuKey}
      badge="Popular"
      seoDescription="Create strong, randomized, uncrackable passwords in seconds. 100% client-side cryptographic generation with customizable length, uppercase, numbers, and symbols."
      seoKeywords="strong password generator, random password generator, secure password generator, generate password online, create strong password, password maker"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['password-strength-tester', 'hash-generator', 'qr-generator']}
      blogSlug="strong-password-generator-guide"
      blogTitle="Strong Password Generator: How to Create a Secure Password in Seconds"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Output Display */}
        <div className="space-y-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click Generate Password below..."
              className="w-full px-5 py-4 text-center font-mono text-xl sm:text-2xl font-bold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white tracking-wider focus:outline-none"
            />
            {password && (
              <button
                onClick={copyToClipboard}
                className="absolute right-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="space-y-1.5 px-1">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500 dark:text-slate-400">Security Score:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{strength.text}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Length Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Password Length
              </label>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-900/40 px-3 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800">
                {length} chars
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>8 (Minimum)</span>
              <span>16 (Recommended)</span>
              <span>64 (Ultra Secure)</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Symbols (!@#$%^&*)</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-base"
        >
          <LuRefreshCw size={18} /> Generate New Secure Password
        </button>

        {/* Recent History */}
        {history.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Recently Generated Passwords (Session Only)
            </h4>
            <div className="space-y-1.5">
              {history.map((h, i) => (
                <div key={i} className="flex justify-between items-center font-mono text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="truncate pr-2 text-slate-800 dark:text-slate-200">{h}</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(h); }}
                    className="text-blue-600 hover:text-blue-700 text-[11px] font-semibold flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;
