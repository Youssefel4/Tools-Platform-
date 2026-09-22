import React, { useState, useEffect, useRef } from 'react';
import { LuPlay, LuPause, LuRotateCcw, LuFlag, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const Stopwatch = () => {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - timeMs;
      timerRef.current = setInterval(() => {
        setTimeMs(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const toggleStart = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  const recordLap = () => {
    const prevTime = laps.length > 0 ? laps[0].overallMs : 0;
    const lapSplit = timeMs - prevTime;
    setLaps([{ id: laps.length + 1, lapMs: lapSplit, overallMs: timeMs }, ...laps]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const centiseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${centiseconds}`;
  };

  // Fastest & slowest lap calculation
  let fastestLapId = null;
  let slowestLapId = null;
  if (laps.length > 1) {
    let min = Infinity;
    let max = -Infinity;
    laps.forEach(l => {
      if (l.lapMs < min) { min = l.lapMs; fastestLapId = l.id; }
      if (l.lapMs > max) { max = l.lapMs; slowestLapId = l.id; }
    });
  }

  const copyLaps = () => {
    const txt = laps.map(l => `Lap ${l.id}: ${formatTime(l.lapMs)} (Total: ${formatTime(l.overallMs)})`).join('\n');
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "How accurate is this web stopwatch?",
      answer: "This stopwatch benchmarks timestamps against the system clock (`Date.now()`) with centisecond (10ms) rendering intervals, ensuring pinpoint accuracy without browser drift."
    },
    {
      question: "How do lap splits work?",
      answer: "Clicking 'Record Lap' logs the time elapsed since the previous lap split, allowing athletes and timers to compare interval pace."
    }
  ];

  const howToUse = [
    { title: "Start Timer", desc: "Click Start to begin millisecond timing." },
    { title: "Record Laps", desc: "Click Lap while running to record individual split intervals." },
    { title: "Export Split Times", desc: "Copy the full lap summary table to your clipboard with one click." }
  ];

  return (
    <ToolLayout
      title="Digital Stopwatch & Lap Timer"
      subtitle="High-precision millisecond stopwatch with split lap tracking and fastest lap indicators."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuPlay}
      badge="New"
      seoKeywords="stopwatch online, digital stopwatch, lap timer, millisecond timer, accurate stopwatch"
      seoDescription="Free online digital stopwatch with millisecond precision, split lap counter, fastest lap highlighting, and lap data export."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['countdown-timer', 'time-calculator', 'pomodoro-timer']}
    >
      <div className="space-y-8 max-w-md mx-auto text-center">
        {/* Main Display */}
        <div className="p-10 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800">
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-2">
            Elapsed Stopwatch Time
          </span>
          <div className="text-5xl sm:text-6xl font-mono font-black text-blue-400 tracking-tight">
            {formatTime(timeMs)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleStart}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRunning ? <LuPause size={20} /> : <LuPlay size={20} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={recordLap}
            disabled={!isRunning}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors disabled:opacity-40"
          >
            <LuFlag size={18} /> Lap
          </button>

          <button
            onClick={reset}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            title="Reset Stopwatch"
          >
            <LuRotateCcw size={20} />
          </button>
        </div>

        {/* Laps Table */}
        {laps.length > 0 && (
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 text-left">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 font-bold text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span>Laps ({laps.length})</span>
              <button
                onClick={copyLaps}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold normal-case text-xs"
              >
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? 'Copied' : 'Copy All'}
              </button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto font-mono text-xs sm:text-sm">
              {laps.map(l => {
                const isFastest = l.id === fastestLapId;
                const isSlowest = l.id === slowestLapId;
                return (
                  <div key={l.id} className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Lap {l.id}</span>
                      {isFastest && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Fastest</span>}
                      {isSlowest && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">Slowest</span>}
                    </div>
                    <div className="space-x-4">
                      <span className="font-bold text-slate-900 dark:text-white">{formatTime(l.lapMs)}</span>
                      <span className="text-slate-400 text-xs">{formatTime(l.overallMs)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default Stopwatch;
