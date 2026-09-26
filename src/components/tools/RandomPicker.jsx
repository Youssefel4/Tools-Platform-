import React, { useState } from 'react';
import { LuShuffle, LuTrophy, LuRotateCcw, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const RandomPicker = () => {
  const [tab, setTab] = useState('names'); // 'names' or 'numbers'

  // Names State
  const [namesText, setNamesText] = useState("Alex Johnson\nMaria Garcia\nLiam Smith\nEmma Wilson\nNoah Brown\nSophia Davis\nJames Miller");
  const [winner, setWinner] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);

  // Numbers State
  const [minNum, setMinNum] = useState('1');
  const [maxNum, setMaxNum] = useState('100');
  const [countNum, setCountNum] = useState('5');
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [copiedNum, setCopiedNum] = useState(false);

  // Draw Name Winner
  const drawName = () => {
    const list = namesText.split('\n').map(n => n.trim()).filter(n => n.length > 0);
    if (list.length === 0) return;

    setIsDrawing(true);
    setWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const tempPick = list[Math.floor(Math.random() * list.length)];
      setWinner(tempPick);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const finalPick = list[Math.floor(Math.random() * list.length)];
        setWinner(finalPick);
        setIsDrawing(false);

        if (removeAfterPick) {
          const updated = list.filter(n => n !== finalPick);
          setNamesText(updated.join('\n'));
        }
      }
    }, 100);
  };

  // Generate Numbers
  const generateNumbers = () => {
    const min = parseInt(minNum, 10) || 1;
    const max = parseInt(maxNum, 10) || 100;
    const qty = Math.min(100, Math.max(1, parseInt(countNum, 10) || 1));

    if (min >= max) return;

    const results = [];
    if (allowDuplicates) {
      for (let i = 0; i < qty; i++) {
        results.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const pool = [];
      for (let i = min; i <= max; i++) pool.push(i);
      for (let i = 0; i < Math.min(qty, pool.length); i++) {
        const idx = Math.floor(Math.random() * pool.length);
        results.push(pool.splice(idx, 1)[0]);
      }
    }
    setGeneratedNumbers(results);
  };

  const copyNumbers = () => {
    navigator.clipboard.writeText(generatedNumbers.join(', '));
    setCopiedNum(true);
    setTimeout(() => setCopiedNum(false), 2000);
  };

  const faqs = [
    {
      question: "How does the random draw algorithm work?",
      answer: "It uses JavaScript's cryptographically sound Math.random() pseudorandom distribution to guarantee that every candidate entry has an equal mathematical probability of selection."
    },
    {
      question: "Can I pick multiple winners without duplicates?",
      answer: "Yes, check 'Remove Winner from List After Selection' so that each winner is automatically excluded from subsequent draws."
    }
  ];

  const howToUse = [
    { title: "Select Mode", desc: "Choose between Random Contest Name Picker or Random Number Generator." },
    { title: "Configure List or Bounds", desc: "Paste participant names or specify minimum and maximum integer bounds." },
    { title: "Roll & Reveal", desc: "Watch the shuffle animation and reveal the winner or numbers." }
  ];

  return (
    <ToolLayout
      title="Random Name & Number Picker"
      subtitle="Pick random giveaway contest winners or generate random numbers with custom ranges."
      category="text"
      categoryName="Text Tools"
      icon={LuShuffle}
      badge="Popular"
      seoKeywords="random name picker, random number generator, giveaway winner picker, raffle picker, pick a name"
      seoDescription="Free online random name and number picker. Pick giveaway winners with animated suspense draw or generate random numbers with no duplicates."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['dice-roller', 'password-generator', 'text-counter']}
    >
      <div className="space-y-8 max-w-xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTab('names')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'names'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Random Name Picker
            </button>
            <button
              onClick={() => setTab('numbers')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === 'numbers'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Random Number Generator
            </button>
          </div>
        </div>

        {tab === 'names' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Participants List (One per line)
              </label>
              <textarea
                rows={6}
                value={namesText}
                onChange={(e) => setNamesText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter names here..."
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={removeAfterPick}
                  onChange={(e) => setRemoveAfterPick(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                Remove winner from list after pick
              </label>

              <button
                onClick={drawName}
                disabled={isDrawing || !namesText.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                <LuShuffle size={16} /> {isDrawing ? 'Shuffling...' : 'Pick a Winner!'}
              </button>
            </div>

            {winner && (
              <div className="p-8 rounded-3xl bg-[#804DF2] text-white text-center shadow-xl shadow-[#804DF2]/20 animate-fade-in">
                <LuTrophy className="mx-auto text-yellow-200 mb-2" size={44} />
                <span className="text-xs uppercase font-bold tracking-wider opacity-90">
                  Winning Selection
                </span>
                <div className="text-3xl sm:text-4xl font-black mt-1">
                  {winner}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  value={minNum}
                  onChange={(e) => setMinNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  value={maxNum}
                  onChange={(e) => setMaxNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={countNum}
                  onChange={(e) => setCountNum(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                Allow Duplicate Numbers
              </label>

              <button
                onClick={generateNumbers}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <LuShuffle size={16} /> Generate Numbers
              </button>
            </div>

            {generatedNumbers.length > 0 && (
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Results ({generatedNumbers.length})
                  </span>
                  <button
                    onClick={copyNumbers}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    {copiedNum ? <LuCheck size={14} /> : <LuCopy size={14} />}
                    {copiedNum ? 'Copied' : 'Copy Numbers'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {generatedNumbers.map((num, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-lg text-slate-900 dark:text-white flex items-center justify-center shadow-sm"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default RandomPicker;
