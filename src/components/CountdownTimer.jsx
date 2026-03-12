import React, { useState, useEffect, useRef } from 'react';
import SEO from './SEO';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, totalSeconds]);

  const playAlarm = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => { }); // Audio play failed silently
  };

  const startTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
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
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (totalSecs) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const displayHours = Math.floor(totalSeconds / 3600);
  const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  const displaySeconds = totalSeconds % 60;

  const presetTimers = [
    { name: '1 Minute', hours: 0, minutes: 1, seconds: 0 },
    { name: '5 Minutes', hours: 0, minutes: 5, seconds: 0 },
    { name: '10 Minutes', hours: 0, minutes: 10, seconds: 0 },
    { name: '15 Minutes', hours: 0, minutes: 15, seconds: 0 },
    { name: '30 Minutes', hours: 0, minutes: 30, seconds: 0 },
    { name: '1 Hour', hours: 1, minutes: 0, seconds: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Countdown Timer"
        description="Free online countdown timer with alarm - set hours, minutes, and seconds. Perfect for cooking, workouts, meetings, and time management. Simple and easy to use timer."
        keywords="countdown timer, online timer, alarm timer, stopwatch, time tracker, cooking timer, workout timer, free timer, countdown clock, timer app"
        url="https://platformtools.netlify.app/countdown-timer"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Countdown <span className="text-gradient">Timer</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Set countdown timers with alarms for tasks, cooking, or focused work sessions
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-6 drop-shadow-md tracking-tight overflow-hidden animate-pulse-subtle">
              {formatTime(totalSeconds)}
            </div>
            {isRunning && !isPaused && (
              <div className="inline-flex items-center px-4 py-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-bold shadow-sm border border-green-200 dark:border-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                Running
              </div>
            )}
            {isRunning && isPaused && (
              <div className="inline-flex items-center px-4 py-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-bold shadow-sm border border-yellow-200 dark:border-yellow-800">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2.5"></span>
                Paused
              </div>
            )}
          </div>

          {!isRunning ? (
            <div className="mb-8 relative z-10 transition-all duration-300">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto">
                <div className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transform transition-all hover:scale-105">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 text-center uppercase tracking-widest">
                    Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-700 text-center text-4xl sm:text-5xl font-black font-mono focus:ring-0 focus:border-blue-500 dark:text-white transition-all"
                  />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transform transition-all hover:scale-105">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 text-center uppercase tracking-widest">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-700 text-center text-4xl sm:text-5xl font-black font-mono focus:ring-0 focus:border-blue-500 dark:text-white transition-all"
                  />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transform transition-all hover:scale-105">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 text-center uppercase tracking-widest">
                    Seconds
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-2 py-2 bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-700 text-center text-4xl sm:text-5xl font-black font-mono focus:ring-0 focus:border-blue-500 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div className="mb-10 max-w-3xl mx-auto">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 text-center uppercase tracking-wider">Quick Presets</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {presetTimers.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setHours(preset.hours);
                        setMinutes(preset.minutes);
                        setSeconds(preset.seconds);
                      }}
                      className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all font-medium text-sm hover:scale-105 shadow-sm"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <button
                  onClick={startTimer}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-purple-500/30 font-bold text-xl flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Start Timer
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 max-w-xl mx-auto relative z-10 transition-all duration-300 animate-fade-in-up">
              <button
                onClick={pauseTimer}
                className={`flex-1 px-8 py-4 ${isPaused ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-500/30' : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-orange-500/30'} text-white rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1 font-bold text-xl flex items-center justify-center gap-3`}
              >
                {isPaused ? (
                  <><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Resume</>
                ) : (
                  <><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Pause</>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="flex-1 px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/40 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 rounded-2xl transition-all transform hover:-translate-y-1 font-bold text-xl flex items-center justify-center gap-3 shadow-sm hover:shadow-red-500/10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-xl">📊</span>
            </div>
            Timer Progress
          </h2>
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">
              <span className="uppercase tracking-wider">Progress</span>
              <span className="text-blue-600 dark:text-blue-400">
                {totalSeconds === 0 ? '0' : Math.round((1 - totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner overflow-hidden flex">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-linear shadow-sm"
                style={{
                  width: `${totalSeconds === 0 ? (isRunning ? 0 : 100) : Math.round((1 - totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100)}%`
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"></div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white font-mono mb-1">
                {displayHours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hours</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl"></div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white font-mono mb-1">
                {displayMinutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Minutes</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full blur-xl"></div>
              <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white font-mono mb-1">
                {displaySeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Seconds</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '250px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
