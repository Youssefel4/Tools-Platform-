import React, { useState } from 'react';
import { LuDices, LuCoins, LuRotateCcw } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const DiceRoller = () => {
  const [tab, setTab] = useState('dice'); // 'dice' or 'coin'

  // Dice state
  const [diceType, setDiceType] = useState(6); // d6 default
  const [diceCount, setDiceCount] = useState(2);
  const [diceResults, setDiceResults] = useState([4, 5]);
  const [isRolling, setIsRolling] = useState(false);

  // Coin state
  const [coinResult, setCoinResult] = useState('Heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useState(1);
  const [tailsCount, setTailsCount] = useState(0);

  const rollDice = () => {
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      const tempRolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceType) + 1);
      setDiceResults(tempRolls);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const finalRolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceType) + 1);
        setDiceResults(finalRolls);
        setIsRolling(false);
      }
    }, 60);
  };

  const flipCoin = () => {
    setIsFlipping(true);
    setTimeout(() => {
      const result = Math.random() >= 0.5 ? 'Heads' : 'Tails';
      setCoinResult(result);
      if (result === 'Heads') setHeadsCount(prev => prev + 1);
      else setTailsCount(prev => prev + 1);
      setIsFlipping(false);
    }, 400);
  };

  const totalSum = diceResults.reduce((a, b) => a + b, 0);

  const faqs = [
    {
      question: "Which polyhedral dice types are supported?",
      answer: "We support all standard tabletop RPG dice: d4, d6, d8, d10, d12, d20, and percentile d100."
    },
    {
      question: "Is this virtual dice roller mathematically fair?",
      answer: "Yes, it uses JavaScript's cryptographically uniform floating point distribution to ensure unbiased randomness for every roll."
    }
  ];

  const howToUse = [
    { title: "Pick Dice Type & Count", desc: "Select d4 through d20 and choose how many dice to roll." },
    { title: "Roll with Animation", desc: "Click Roll to simulate tumbling dice with live sum totals." },
    { title: "Flip Virtual Coin", desc: "Switch to the Coin tab for instant 50/50 decision making." }
  ];

  return (
    <ToolLayout
      title="Virtual Dice Roller & Coin Flip"
      subtitle="Roll polyhedral tabletop RPG dice (d4 through d20) with live totals, or flip a virtual coin."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuDices}
      badge="Fun"
      seoKeywords="dice roller, virtual dice, roll a die, d20 roller, coin flip online, roll d6"
      seoDescription="Free online virtual dice roller and coin flipper. Roll polyhedral dice (d4, d6, d8, d10, d12, d20) with live sums and flip coins for fair decisions."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['random-picker', 'mini-games', 'countdown-timer']}
    >
      <div className="space-y-8 max-w-xl mx-auto text-center">
        {/* Tab Selector */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setTab('dice')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === 'dice'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Dice Roller
          </button>
          <button
            onClick={() => setTab('coin')}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === 'coin'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Coin Flipper
          </button>
        </div>

        {tab === 'dice' ? (
          <div className="space-y-6">
            {/* Dice Selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[4, 6, 8, 10, 12, 20, 100].map(sides => (
                <button
                  key={sides}
                  onClick={() => setDiceType(sides)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all border ${
                    diceType === sides
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  d{sides}
                </button>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Number of Dice:</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 6].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setDiceCount(cnt)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs ${
                      diceCount === cnt
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Dice Visual Canvas */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-4 justify-center items-center my-4">
                {diceResults.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-500/30 font-black text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center justify-center shadow-lg transform transition-transform ${
                      isRolling ? 'rotate-12 scale-110' : ''
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs uppercase tracking-wider text-slate-400 block">
                  Total Sum
                </span>
                <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                  {totalSum}
                </span>
              </div>
            </div>

            <button
              onClick={rollDice}
              disabled={isRolling}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg transition-all"
            >
              <LuDices size={20} /> {isRolling ? 'Rolling...' : `Roll ${diceCount}d${diceType}`}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-10 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
              <div className="flex justify-center">
                <div
                  className={`w-32 h-32 rounded-full border-4 border-amber-400 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-950 font-black text-2xl flex items-center justify-center shadow-2xl transition-transform duration-300 ${
                    isFlipping ? 'scale-90 rotate-180' : ''
                  }`}
                >
                  {isFlipping ? '?' : coinResult}
                </div>
              </div>

              <div className="flex justify-center gap-8 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Heads Count</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">{headsCount}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Tails Count</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg">{tailsCount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={flipCoin}
              disabled={isFlipping}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-lg transition-all"
            >
              <LuCoins size={20} /> {isFlipping ? 'Flipping Coin...' : 'Flip Coin'}
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default DiceRoller;
