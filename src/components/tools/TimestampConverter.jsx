import React, { useState, useEffect } from 'react';
import { LuClock, LuCopy, LuCheck, LuRotateCcw } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TimestampConverter = () => {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [epochInput, setEpochInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Epoch to Date Calculation
  let epochDate = null;
  const numEpoch = parseInt(epochInput, 10);
  if (!isNaN(numEpoch)) {
    // If > 100000000000 assume milliseconds, else seconds
    const ms = epochInput.length > 10 ? numEpoch : numEpoch * 1000;
    epochDate = new Date(ms);
  }

  // Date to Epoch Calculation
  let convertedEpoch = 0;
  if (dateInput) {
    const parsed = new Date(dateInput);
    if (!isNaN(parsed.getTime())) {
      convertedEpoch = Math.floor(parsed.getTime() / 1000);
    }
  }

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqs = [
    {
      question: "What is Unix Epoch time?",
      answer: "Unix epoch time is the number of seconds that have elapsed since 00:00:00 UTC on January 1, 1970 (not counting leap seconds). It is the universal standard for timestamping in operating systems and databases."
    },
    {
      question: "Does this tool support both seconds and milliseconds?",
      answer: "Yes! If you provide a 10-digit number, it treats it as seconds. If you provide a 13-digit timestamp, it automatically parses it as milliseconds."
    }
  ];

  const howToUse = [
    { title: "Current Epoch Ticker", desc: "View the real-time Unix timestamp ticking by the second." },
    { title: "Convert Epoch to Date", desc: "Type or paste an epoch number to see its UTC, ISO, and Local time representation." },
    { title: "Convert Date to Epoch", desc: "Select a calendar date and time to instantly get its Unix timestamp." }
  ];

  return (
    <ToolLayout
      title="UNIX Timestamp Converter"
      subtitle="Real-time Unix epoch timestamp to human date converter and date-to-epoch converter."
      category="converters"
      categoryName="Converters"
      icon={LuClock}
      badge="Popular"
      seoKeywords="timestamp converter, unix timestamp, epoch to date, date to timestamp, unix time converter"
      seoDescription="Free online Unix timestamp converter. Convert epoch timestamps to human readable dates (UTC & Local) and generate timestamps from dates in real time."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['date-calculator', 'time-calculator', 'countdown-timer']}
    >
      <div className="space-y-8">
        {/* Live Epoch Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Current Unix Epoch Timestamp
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-black mt-1">
              {currentEpoch}
            </div>
            <div className="text-xs opacity-80 mt-1">
              Seconds since Jan 01, 1970 00:00:00 UTC
            </div>
          </div>
          <button
            onClick={() => copyVal(currentEpoch.toString(), 'live')}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold text-sm transition-all"
          >
            {copied === 'live' ? <LuCheck size={16} /> : <LuCopy size={16} />}
            {copied === 'live' ? 'Copied' : 'Copy Timestamp'}
          </button>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Epoch to Date */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Epoch Timestamp to Human Date
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 1774224000"
              />
              <button
                onClick={() => setEpochInput(currentEpoch.toString())}
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                Set Now
              </button>
            </div>

            {epochDate && !isNaN(epochDate.getTime()) ? (
              <div className="space-y-2 pt-2 text-sm">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">UTC Time</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {epochDate.toUTCString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">Local Time</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {epochDate.toString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">ISO 8601</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {epochDate.toISOString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-rose-500">Invalid Unix timestamp.</p>
            )}
          </div>

          {/* Date to Epoch */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Human Date & Time to Epoch
            </h3>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="pt-2 space-y-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Seconds (Standard)</span>
                  <span className="font-mono font-bold text-xl text-blue-600 dark:text-blue-400">
                    {convertedEpoch}
                  </span>
                </div>
                <button
                  onClick={() => copyVal(convertedEpoch.toString(), 'cSec')}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {copied === 'cSec' ? <LuCheck size={18} /> : <LuCopy size={18} />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Milliseconds (JS)</span>
                  <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                    {convertedEpoch * 1000}
                  </span>
                </div>
                <button
                  onClick={() => copyVal((convertedEpoch * 1000).toString(), 'cMs')}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {copied === 'cMs' ? <LuCheck size={18} /> : <LuCopy size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimestampConverter;
