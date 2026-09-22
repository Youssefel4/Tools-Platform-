import React, { useState } from 'react';
import { LuArrowLeftRight, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TextReverser = () => {
  const [text, setText] = useState('Hello World! Welcome to Tools Platform.');
  const [mode, setMode] = useState('chars'); // 'chars', 'words', 'lines', 'upsideDown'
  const [copied, setCopied] = useState(false);

  const upsideDownMap = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
    j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
    s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: '𐐒', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
    J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'y',
    S: 'S', T: '┴', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
    '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
    '8': '8', '9': '6', '0': '0', '.': '˙', ',': '\'', '?': '¿', '!': '¡'
  };

  const reverseChars = (str) => str.split('').reverse().join('');
  const reverseWords = (str) => str.split(' ').reverse().join(' ');
  const reverseLines = (str) => str.split('\n').reverse().join('\n');
  const flipUpsideDown = (str) => {
    return str
      .split('')
      .reverse()
      .map(c => upsideDownMap[c] || c)
      .join('');
  };

  let output = '';
  if (mode === 'chars') output = reverseChars(text);
  else if (mode === 'words') output = reverseWords(text);
  else if (mode === 'lines') output = reverseLines(text);
  else if (mode === 'upsideDown') output = flipUpsideDown(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between reversing characters and reversing words?",
      answer: "Reversing characters turns 'Hello World' into 'dlroW olleH'. Reversing words preserves each individual word's spelling while inverting their order: 'World Hello'."
    },
    {
      question: "How does upside-down flipped text work?",
      answer: "It maps standard Latin glyphs to Unicode upside-down character counterparts and reverses their order so the text looks inverted."
    }
  ];

  const howToUse = [
    { title: "Input Text", desc: "Type or paste your text in the box." },
    { title: "Select Reversal Mode", desc: "Choose reverse characters, reverse words, reverse lines, or upside-down flip." },
    { title: "Copy Result", desc: "Copy the inverted text for social posts or fun messages." }
  ];

  return (
    <ToolLayout
      title="Text Reverser"
      subtitle="Reverse text characters, reverse word order, invert line sequence, or flip text upside-down."
      category="text"
      categoryName="Text Tools"
      icon={LuArrowLeftRight}
      badge="New"
      seoKeywords="text reverser, reverse text, reverse words, upside down text, backwards text generator"
      seoDescription="Free online text reverser. Reverse characters, word order, line sequences, or flip text upside down with instant clipboard copy."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['case-converter', 'text-counter', 'lorem-ipsum-generator']}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-wrap">
            <button
              onClick={() => setMode('chars')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'chars' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Reverse Characters
            </button>
            <button
              onClick={() => setMode('words')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'words' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Reverse Words
            </button>
            <button
              onClick={() => setMode('lines')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'lines' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Reverse Lines
            </button>
            <button
              onClick={() => setMode('upsideDown')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                mode === 'upsideDown' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Upside Down ɐ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Original Text
            </label>
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type text here..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Reversed Text
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
              rows={8}
              readOnly
              value={output}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium text-base outline-none"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextReverser;
