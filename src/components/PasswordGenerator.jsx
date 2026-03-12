import React, { useState } from 'react';
import SEO from './SEO';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      alert('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    setPasswordHistory([newPassword, ...passwordHistory.slice(0, 9)]);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { strength: 0, text: 'None', color: 'bg-gray-300' };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (pwd.length >= 16) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (strength <= 4) return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 6) return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Password Generator"
        description="Free secure password generator - create strong, random passwords with customizable length, uppercase, lowercase, numbers, and special characters. Generate passwords up to 128 characters."
        keywords="password generator, secure password generator, random password, strong password, password creator, secure password maker, password strength checker, free password generator"
        url="https://platformtools.netlify.app/password-generator"
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Password <span className="text-gradient">Generator</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Generate secure passwords with customizable options locally on your device
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden mb-8 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="mb-8 relative z-10">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider text-center">
              Generated Password
            </label>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 px-5 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-mono text-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
                placeholder="Click generate"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                <span>📋</span> Copy
              </button>
            </div>
            
            {password && (
              <div className="mt-6 bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm animate-fade-in-up">
                <div className="flex items-center justify-between mb-3 tracking-wide">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Password Strength</span>
                  <span className="text-sm font-black px-3 py-1 rounded-full border bg-white/50 dark:bg-gray-900/50" 
                        style={{ color: strength.color.replace('bg-', '').replace('-500', ''), borderColor: strength.color.replace('bg-', '').replace('-500', '') }}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${strength.color} h-2.5 rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${strength.strength}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <label className="flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                <span>Password Length</span>
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-lg border border-blue-200 dark:border-blue-800">{length}</span>
              </label>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500 mt-2">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider text-center">
                Character Types
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 shadow-sm has-[:checked]:border-blue-300 dark:has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-900/10">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">ABC</span>
                </label>
                <label className="flex items-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 shadow-sm has-[:checked]:border-blue-300 dark:has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-900/10">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">abc</span>
                </label>
                <label className="flex items-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 shadow-sm has-[:checked]:border-blue-300 dark:has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-900/10">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">123</span>
                </label>
                <label className="flex items-center p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50 shadow-sm has-[:checked]:border-blue-300 dark:has-[:checked]:border-blue-700 has-[:checked]:bg-blue-50/50 dark:has-[:checked]:bg-blue-900/10">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">!@#</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 relative z-10 flex items-center justify-center gap-2"
          >
            <span>🔄</span> Generate Password
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {passwordHistory.length > 0 && (
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
                  <span>🕒</span> Password History
                </h2>
                <div className="space-y-3 relative z-10 overflow-y-auto pr-2 custom-scrollbar flex-grow" style={{ maxHeight: '300px' }}>
                  {passwordHistory.map((pwd, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-800/40 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
                      <span className="font-mono text-sm text-gray-900 dark:text-white flex-1 mr-3 truncate font-medium">
                        {pwd}
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(pwd)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-lg transition-colors text-sm font-bold opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className={`glass-panel rounded-3xl p-8 relative ${passwordHistory.length === 0 ? 'md:col-span-2' : ''}`}>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
                <span>💡</span> Password Tips
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 relative z-10 font-medium text-sm">
                <li className="flex items-start bg-white/30 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/30">
                  <span className="text-emerald-500 mr-3 text-lg">✓</span>
                  <span>Use at least 12 characters for strong security</span>
                </li>
                <li className="flex items-start bg-white/30 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/30">
                  <span className="text-emerald-500 mr-3 text-lg">✓</span>
                  <span>Include a diverse mix of uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start bg-white/30 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/30">
                  <span className="text-emerald-500 mr-3 text-lg">✓</span>
                  <span>Avoid using personal information like names or common dictionary words</span>
                </li>
                <li className="flex items-start bg-white/30 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/30">
                  <span className="text-emerald-500 mr-3 text-lg">✓</span>
                  <span>Use unique passwords for each different account</span>
                </li>
                <li className="flex items-start bg-white/30 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700/30">
                  <span className="text-emerald-500 mr-3 text-lg">✓</span>
                  <span>Consider a trusted password manager for organization</span>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
