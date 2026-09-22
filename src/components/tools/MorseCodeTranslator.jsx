import React, { useState } from 'react';
import { LuRadio, LuCopy, LuCheck, LuPlay, LuSquare } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const MorseCodeTranslator = () => {
  const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  const reverseMap = {};
  Object.keys(morseMap).forEach(k => {
    reverseMap[morseMap[k]] = k;
  });

  const [mode, setMode] = useState('text2morse'); // 'text2morse' or 'morse2text'
  const [input, setInput] = useState('SOS HELP');
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Conversion
  const textToMorse = (str) => {
    return str
      .toUpperCase()
      .split('')
      .map(char => morseMap[char] || '')
      .filter(m => m.length > 0)
      .join(' ');
  };

  const morseToText = (morse) => {
    return morse
      .trim()
      .split(/\s+/)
      .map(code => reverseMap[code] || '')
      .join('');
  };

  const output = mode === 'text2morse' ? textToMorse(input) : morseToText(input);

  // Web Audio Tone Player
  const playMorseSound = () => {
    if (isPlaying || !output) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const dotTime = 0.08;
      let currentTime = ctx.currentTime;

      const morseStr = mode === 'text2morse' ? output : input;
      setIsPlaying(true);

      for (let i = 0; i < morseStr.length; i++) {
        const char = morseStr[i];
        if (char === '.' || char === '-') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = 650;
          osc.connect(gain);
          gain.connect(ctx.destination);

          const duration = char === '.' ? dotTime : dotTime * 3;
          osc.start(currentTime);
          osc.stop(currentTime + duration);
          currentTime += duration + dotTime;
        } else if (char === ' ') {
          currentTime += dotTime * 2;
        } else if (char === '/') {
          currentTime += dotTime * 5;
        }
      }

      setTimeout(() => {
        setIsPlaying(false);
      }, (currentTime - ctx.currentTime) * 1000);
    } catch (e) {
      setIsPlaying(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is International Morse Code?",
      answer: "International Morse Code encodes letters and numbers into standard sequences of short signals (dots or 'dits') and long signals (dashes or 'dahs'). A dash is 3 times the duration of a dot."
    },
    {
      question: "What does SOS translate to in Morse code?",
      answer: "SOS translates to: · · · — — — · · · (three dots, three dashes, three dots). Because of its distinctive cadence, it became the universal maritime distress signal."
    }
  ];

  const howToUse = [
    { title: "Select Mode", desc: "Choose whether you are translating plain text to Morse code or decoding Morse code back to text." },
    { title: "Listen with Audio", desc: "Click the Play Audio button to hear the authentic 650Hz audio tone beeps." },
    { title: "Copy Morse Symbols", desc: "Copy the dot-and-dash Morse string with one click." }
  ];

  return (
    <ToolLayout
      title="Morse Code Translator & Audio Beeper"
      subtitle="Translate text to Morse code and Morse to text with real-time audio sound playback."
      category="converters"
      categoryName="Converters"
      icon={LuRadio}
      badge="Audio"
      seoKeywords="morse code translator, text to morse, morse code audio, morse code sound, decode morse code"
      seoDescription="Free online Morse Code translator with audio playback. Translate text to Morse code and decode dots and dashes with real 650Hz tone beeps."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['base-converter', 'url-encoder', 'case-converter']}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { setMode('text2morse'); setInput('HELLO WORLD'); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'text2morse' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Text to Morse
            </button>
            <button
              onClick={() => { setMode('morse2text'); setInput('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'morse2text' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Morse to Text
            </button>
          </div>

          <button
            onClick={playMorseSound}
            disabled={isPlaying}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all ${
              isPlaying
                ? 'bg-amber-500 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? <LuSquare size={16} /> : <LuPlay size={16} />}
            {isPlaying ? 'Beeping...' : 'Play Audio Tone'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Input {mode === 'text2morse' ? 'English Text' : 'Morse Code (dots, dashes, /)'}
            </label>
            <textarea
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={mode === 'text2morse' ? 'Type text here...' : '... --- ...'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Translation Output
              </label>
              <button
                onClick={handleCopy}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              rows={6}
              readOnly
              value={output}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-lg font-bold outline-none"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MorseCodeTranslator;
