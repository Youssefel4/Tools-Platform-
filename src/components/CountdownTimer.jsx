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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Countdown Timer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set countdown timers for your tasks and activities
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl md:text-8xl font-mono font-bold text-gray-900 dark:text-white mb-4">
              {formatTime(totalSeconds)}
            </div>
            {isRunning && !isPaused && (
              <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Running
              </div>
            )}
            {isRunning && isPaused && (
              <div className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Paused
              </div>
            )}
          </div>

          {!isRunning ? (
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                    Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                    Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                    Seconds
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Presets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {presetTimers.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setHours(preset.hours);
                        setMinutes(preset.minutes);
                        setSeconds(preset.seconds);
                      }}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startTimer}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold text-lg"
              >
                Start Timer
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={pauseTimer}
                className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-semibold text-lg"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={resetTimer}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-semibold text-lg"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Timer Progress
          </h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {totalSeconds === 0 ? '0' : Math.round((1 - totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${totalSeconds === 0 ? 100 : Math.round((1 - totalSeconds / (hours * 3600 + minutes * 60 + seconds)) * 100)}%`
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayHours}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayMinutes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {displaySeconds}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
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
