import React, { useState, useEffect, useRef } from 'react';
import { LuKeyboard, LuRotateCcw, LuTrophy } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TypingSpeedTest = () => {
  const passages = [
    "The journey of a thousand miles begins with a single step. Focus on consistency, eliminate distractions, and cultivate daily momentum.",
    "Technology is best when it brings people together. Tools that run locally in the browser empower users with speed and complete privacy.",
    "Practice makes permanence. When you type with rhythm and accuracy, speed naturally follows as muscle memory develops."
  ];

  const [passageIndex, setPassageIndex] = useState(0);
  const targetText = passages[passageIndex];

  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(timerRef.current);
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!isActive && !isFinished) {
      setIsActive(true);
    }

    setUserInput(val);

    if (val.length >= targetText.length) {
      setIsActive(false);
      setIsFinished(true);
      clearInterval(timerRef.current);
    }
  };

  // Metrics
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === targetText[i]) correctChars++;
  }

  const accuracy = userInput.length > 0
    ? Math.round((correctChars / userInput.length) * 100)
    : 100;

  const timeElapsedMinutes = (60 - timeLeft) / 60;
  const wordsTyped = correctChars / 5;
  const wpm = timeElapsedMinutes > 0
    ? Math.round(wordsTyped / timeElapsedMinutes)
    : 0;

  const resetTest = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(60);
    setUserInput('');
    setPassageIndex((passageIndex + 1) % passages.length);
    clearInterval(timerRef.current);
  };

  const faqs = [
    {
      question: "How is Words Per Minute (WPM) calculated?",
      answer: "In standardized typing tests, one 'word' is standardized as 5 keystrokes (including spaces). WPM is calculated as: (Correct Keystrokes / 5) / Elapsed Minutes."
    },
    {
      question: "What is an average typing speed for adults?",
      answer: "The average typing speed is roughly 40 WPM. Professional typists, programmers, and transcriptionists typically average 65 to 90+ WPM."
    }
  ];

  const howToUse = [
    { title: "Start Typing in the Box", desc: "The 60-second timer begins automatically on your first keystroke." },
    { title: "Follow Color Cues", desc: "Green highlights correct letters; red warns of mistyped characters." },
    { title: "Inspect Your Final WPM", desc: "Check your Words Per Minute and accuracy percentage at the end of the test." }
  ];

  return (
    <ToolLayout
      title="Typing Speed Test (WPM)"
      subtitle="Measure your typing speed, keystrokes per minute, and accuracy with timed typing passages."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuKeyboard}
      badge="Popular"
      seoKeywords="typing speed test, wpm test, words per minute, typing test online, keyboard speed test"
      seoDescription="Free online typing speed test. Measure your Words Per Minute (WPM), typing accuracy percentage, and test typing speed in 60 seconds."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'stopwatch', 'pomodoro-timer']}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Top Scorebar */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 uppercase font-bold">Speed (WPM)</span>
            <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {wpm}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 uppercase font-bold">Accuracy</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {accuracy}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 uppercase font-bold">Time Left</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-500 mt-1">
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Target Passage with Live Character Highlighting */}
        <div className="p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-base leading-relaxed tracking-wide select-none">
          {targetText.split('').map((char, index) => {
            let color = 'text-slate-400 dark:text-slate-500';
            if (index < userInput.length) {
              color = userInput[index] === char
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-rose-500 bg-rose-100 dark:bg-rose-900/60 font-bold';
            } else if (index === userInput.length) {
              color = 'text-slate-900 dark:text-white underline font-bold';
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Typing Input */}
        <div>
          <textarea
            rows={3}
            disabled={isFinished}
            value={userInput}
            onChange={handleInputChange}
            placeholder={isFinished ? 'Test completed! Press restart for another round.' : 'Start typing the passage here...'}
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>

        {/* Action Controls */}
        <div className="flex justify-center">
          <button
            onClick={resetTest}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <LuRotateCcw size={16} /> {isFinished ? 'Try New Passage' : 'Restart Test'}
          </button>
        </div>

        {isFinished && (
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 animate-fade-in">
            <LuTrophy className="mx-auto text-amber-500" size={36} />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Great Job! Your Score: {wpm} WPM
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              You achieved {accuracy}% accuracy with {correctChars} correct keystrokes.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TypingSpeedTest;
