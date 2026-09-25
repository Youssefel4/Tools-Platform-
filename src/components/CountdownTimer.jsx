import React, { useState, useEffect, useRef } from 'react';
import { LuTimer, LuPlay, LuPause, LuRotateCcw, LuVolume2 } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [initialSeconds, setInitialSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isPaused, totalSeconds]);

  const playAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio fallback silently
    }
  };

  const startTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setInitialSeconds(total);
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTotalSeconds(initialSeconds || 300);
  };

  const setPreset = (mins) => {
    setIsRunning(false);
    setIsPaused(false);
    setHours(Math.floor(mins / 60));
    setMinutes(mins % 60);
    setSeconds(0);
    const secs = mins * 60;
    setTotalSeconds(secs);
    setInitialSeconds(secs);
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const percentLeft = initialSeconds > 0 ? (totalSeconds / initialSeconds) * 100 : 0;

  const faqs = [
    {
      question: "Does the timer sound play in background tabs?",
      answer: "Yes, modern Web Audio synthesized alerts continue to sound when the timer reaches zero, even if your browser tab is minimized or in the background."
    },
    {
      question: "Can I use preset times for studying or cooking?",
      answer: "Yes, you can click on any quick preset (1m, 5m, 15m, 25m, 45m, 60m) to set the countdown timer instantly."
    },
    {
      question: "Is this online timer completely free?",
      answer: "Yes, the countdown timer is 100% free with unlimited usage, zero ads, and zero downloads required."
    }
  ];

  const howToUse = [
    { title: "Set Desired Time", desc: "Select a quick preset button or enter hours, minutes, and seconds manually." },
    { title: "Start Countdown", desc: "Click Start Timer to begin. Pause and resume whenever necessary." },
    { title: "Audible Chime Alert", desc: "Listen for the chime tone as the countdown reaches zero." }
  ];

  const features = [
    { title: "Quick Presets", desc: "One-click shortcuts for 1m, 5m, 15m, 25m (Pomodoro), and 60 minutes." },
    { title: "Web Audio Chime", desc: "Clear tone sounds reliably at 00:00:00 without external media files." },
    { title: "Visual Progress Bar", desc: "Dynamic animated indicator displays time remaining at a glance." }
  ];

  return (
    <ToolLayout
      title="Online Countdown Timer with Alarm"
      subtitle="Set hours, minutes, and seconds with audible alert chime and quick study presets."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuTimer}
      badge="Productivity"
      seoDescription="Free online countdown timer with alarm sound. Set custom hours, minutes, and seconds for cooking, study, workouts, and productivity with full-screen support."
      seoKeywords="countdown timer, online timer, timer with alarm, free countdown timer, timer clock, study timer, productivity timer"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['pomodoro-timer', 'stopwatch', 'sleep-calculator']}
    >
      <div className="max-w-xl mx-auto space-y-8 text-center">
        {/* Presets */}
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 5, 10, 15, 25, 45, 60].map((m) => (
            <button
              key={m}
              onClick={() => setPreset(m)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {m}m
            </button>
          ))}
        </div>

        {/* Display Screen */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="text-5xl sm:text-7xl font-mono font-black tracking-wider mb-4">
            {formatTime(totalSeconds)}
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
              style={{ width: `${percentLeft}%` }}
            />
          </div>
        </div>

        {/* Manual Time Input (when not running) */}
        {!isRunning && (
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-bold uppercase text-slate-400">Hours</label>
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center bg-transparent font-mono font-bold text-lg text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-bold uppercase text-slate-400">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center bg-transparent font-mono font-bold text-lg text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <label className="text-[10px] font-bold uppercase text-slate-400">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-center bg-transparent font-mono font-bold text-lg text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 text-base"
            >
              <LuPlay size={18} /> Start Timer
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-base"
            >
              <LuPause size={18} /> {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}

          <button
            onClick={resetTimer}
            className="px-6 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-colors flex items-center gap-2 text-base border border-slate-200 dark:border-slate-700"
          >
            <LuRotateCcw size={18} /> Reset
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CountdownTimer;
