import React, { useState, useEffect } from 'react';
import { LuTimer, LuPlay, LuPause, LuRotateCcw, LuCoffee } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const PomodoroTimer = () => {
  const modes = {
    work: { name: 'Focus Session', time: 25 * 60 },
    shortBreak: { name: 'Short Break', time: 5 * 60 },
    longBreak: { name: 'Long Break', time: 15 * 60 }
  };

  const [currentMode, setCurrentMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(modes.work.time);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Audio notification beep
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 880;
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch (e) {}

      setIsRunning(false);
      if (currentMode === 'work') {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);
        if (newCount % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        switchMode('work');
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentMode, sessionsCompleted]);

  const switchMode = (modeKey) => {
    setCurrentMode(modeKey);
    setTimeLeft(modes[modeKey].time);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(modes[currentMode].time);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  const faqs = [
    {
      question: "What is the Pomodoro Technique?",
      answer: "Developed by Francesco Cirillo in the late 1980s, the technique breaks work into 25-minute focused intervals separated by 5-minute short breaks. After four consecutive intervals, a longer 15-to-30-minute break is taken."
    },
    {
      question: "Why does the Pomodoro technique boost productivity?",
      answer: "Timeboxing creates urgency, combats procrastination, mitigates mental burnout, and prevents cognitive fatigue by mandating structured recovery intervals."
    }
  ];

  const howToUse = [
    { title: "Select a Focus Block", desc: "Start with a standard 25-minute Pomodoro session." },
    { title: "Work With Zero Distractions", desc: "Focus entirely on your single task until the interval ends." },
    { title: "Enjoy Your Break", desc: "Take a 5-minute breather or 15-minute extended recovery every 4 rounds." }
  ];

  return (
    <ToolLayout
      title="Pomodoro Focus Timer"
      subtitle="Boost your productivity with timed 25-minute focus intervals and structured break cycles."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuTimer}
      badge="Popular"
      seoKeywords="pomodoro timer, focus timer, study timer, pomodoro technique online, productivity timer"
      seoDescription="Free online Pomodoro focus timer. Boost work concentration with 25-minute intervals, audio alarms, session counters, and custom break cycles."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['countdown-timer', 'stopwatch', 'todo-list']}
    >
      <div className="space-y-8 max-w-md mx-auto text-center">
        {/* Mode Selector */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => switchMode('work')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'work'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Focus (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'shortBreak'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'longBreak'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Circular Countdown Display */}
        <div className="p-12 rounded-3xl bg-[#804DF2] text-white shadow-2xl transition-all duration-500">
          <span className="text-xs uppercase font-bold tracking-widest opacity-90 block mb-2">
            {modes[currentMode].name}
          </span>
          <div className="text-6xl sm:text-7xl font-mono font-black tracking-tight my-2">
            {minutes}:{seconds}
          </div>
          <div className="text-xs font-semibold opacity-90 mt-3">
            Completed Today: {sessionsCompleted} sessions
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <LuPause size={20} /> : <LuPlay size={20} />}
            {isRunning ? 'Pause' : 'Start Focus'}
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="Reset Timer"
          >
            <LuRotateCcw size={20} />
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PomodoroTimer;
