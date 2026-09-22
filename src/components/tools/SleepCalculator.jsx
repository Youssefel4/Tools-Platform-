import React, { useState } from 'react';
import { LuMoon, LuSun, LuClock } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const SleepCalculator = () => {
  const [mode, setMode] = useState('wakeAt'); // 'wakeAt' or 'sleepNow'
  const [wakeHour, setWakeHour] = useState('07');
  const [wakeMinute, setWakeMinute] = useState('00');
  const [wakeAmPm, setWakeAmPm] = useState('AM');

  // Helper to format time
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // Calculate Bedtimes for Target Wake Time
  const getBedtimes = () => {
    let targetHours = parseInt(wakeHour, 10);
    if (wakeAmPm === 'PM' && targetHours < 12) targetHours += 12;
    if (wakeAmPm === 'AM' && targetHours === 12) targetHours = 0;

    const wakeDate = new Date();
    wakeDate.setHours(targetHours);
    wakeDate.setMinutes(parseInt(wakeMinute, 10));
    wakeDate.setSeconds(0);

    // 14 minutes to fall asleep
    // Cycles: 6 (9h), 5 (7.5h), 4 (6h), 3 (4.5h)
    const cycles = [
      { count: 6, hours: 9, label: 'Optimal (6 cycles)' },
      { count: 5, hours: 7.5, label: 'Recommended (5 cycles)' },
      { count: 4, hours: 6, label: 'Minimum (4 cycles)' },
      { count: 3, hours: 4.5, label: 'Power Sleep (3 cycles)' }
    ];

    return cycles.map(c => {
      const bedDate = new Date(wakeDate.getTime() - (c.hours * 60 + 14) * 60 * 1000);
      return {
        time: formatTime(bedDate),
        ...c
      };
    });
  };

  // Calculate Wake Times for Sleeping Now
  const getWakeTimes = () => {
    const now = new Date();
    // 14 min to fall asleep
    const cycles = [
      { count: 6, hours: 9, label: 'Optimal (6 cycles)' },
      { count: 5, hours: 7.5, label: 'Recommended (5 cycles)' },
      { count: 4, hours: 6, label: 'Minimum (4 cycles)' },
      { count: 3, hours: 4.5, label: 'Power Sleep (3 cycles)' }
    ];

    return cycles.map(c => {
      const wakeDate = new Date(now.getTime() + (c.hours * 60 + 14) * 60 * 1000);
      return {
        time: formatTime(wakeDate),
        ...c
      };
    });
  };

  const bedtimes = getBedtimes();
  const wakeTimes = getWakeTimes();

  const faqs = [
    {
      question: "Why are 90-minute sleep cycles important?",
      answer: "A complete sleep cycle takes roughly 90 minutes, progressing from light sleep through deep slow-wave sleep to REM (dream) sleep. Waking up at the end of a cycle rather than in the middle of deep sleep prevents sleep inertia (grogginess)."
    },
    {
      question: "How long does it take an average person to fall asleep?",
      answer: "The average healthy human requires 10 to 20 minutes (estimated at 14 minutes in this calculator) to fall asleep after getting into bed."
    }
  ];

  const howToUse = [
    { title: "Choose Your Intent", desc: "Select whether you have a specific wake-up deadline or are heading to bed right now." },
    { title: "Set Wake Time", desc: "If planning your alarm, choose your desired wake-up hour and AM/PM." },
    { title: "Pick a Cycle Window", desc: "Aim for 5 to 6 cycles (7.5 to 9 hours) for optimal cognitive energy and memory retention." }
  ];

  return (
    <ToolLayout
      title="Sleep Cycle Calculator"
      subtitle="Optimize your bedtimes and wake up refreshed by aligning with natural 90-minute REM cycles."
      category="calculators"
      categoryName="Calculators"
      icon={LuMoon}
      badge="Popular"
      seoKeywords="sleep calculator, bedtime calculator, rem sleep cycles, wake up refreshed, sleep cycle calculator"
      seoDescription="Free online sleep cycle calculator. Find the ideal time to go to bed or wake up based on natural 90-minute REM sleep cycles to avoid grogginess."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['countdown-timer', 'time-calculator', 'pomodoro-timer']}
    >
      <div className="space-y-8 max-w-xl mx-auto">
        <div className="flex justify-center">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode('wakeAt')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'wakeAt'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              I need to wake up at...
            </button>
            <button
              onClick={() => setMode('sleepNow')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'sleepNow'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              If I go to bed now...
            </button>
          </div>
        </div>

        {mode === 'wakeAt' ? (
          <div className="space-y-6">
            <div className="text-center">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Desired Wake-Up Time
              </label>
              <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <select
                  value={wakeHour}
                  onChange={(e) => setWakeHour(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = (i + 1).toString().padStart(2, '0');
                    return <option key={h} value={h}>{h}</option>;
                  })}
                </select>
                <span className="font-bold text-slate-400">:</span>
                <select
                  value={wakeMinute}
                  onChange={(e) => setWakeMinute(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none"
                >
                  {['00', '15', '30', '45'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  value={wakeAmPm}
                  onChange={(e) => setWakeAmPm(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg outline-none"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
                Recommended Bedtimes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bedtimes.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      idx === 0 || idx === 1
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white my-1">
                      {item.time}
                    </div>
                    <span className="text-xs text-slate-500">
                      ({item.hours} hrs of sleep + 14m to drift off)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
                Set Your Alarm for One of These Times
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wakeTimes.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      idx === 0 || idx === 1
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white my-1">
                      {item.time}
                    </div>
                    <span className="text-xs text-slate-500">
                      ({item.hours} hours in bed)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default SleepCalculator;
