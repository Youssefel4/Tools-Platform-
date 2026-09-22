import React, { useState } from 'react';
import { LuSparkles, LuCopy, LuCheck, LuRotateCcw } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const LoremIpsumGenerator = () => {
  const [count, setCount] = useState('3');
  const [type, setType] = useState('paragraphs'); // 'paragraphs', 'sentences', 'words'
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [copied, setCopied] = useState(false);

  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur',
    'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt',
    'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est',
    'laborum'
  ];

  const generateSentence = () => {
    const len = Math.floor(Math.random() * 8) + 8;
    const sent = [];
    for (let i = 0; i < len; i++) {
      sent.push(words[Math.floor(Math.random() * words.length)]);
    }
    const str = sent.join(' ');
    return str.charAt(0).toUpperCase() + str.slice(1) + '.';
  };

  const generateParagraph = () => {
    const numSentences = Math.floor(Math.random() * 3) + 4;
    const sentences = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generateText = () => {
    const n = Math.max(1, parseInt(count, 10) || 1);
    let output = '';

    if (type === 'words') {
      const wList = [];
      if (startWithLorem) {
        wList.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      }
      while (wList.length < n) {
        wList.push(words[Math.floor(Math.random() * words.length)]);
      }
      output = wList.slice(0, n).join(' ');
    } else if (type === 'sentences') {
      const sList = [];
      for (let i = 0; i < n; i++) {
        if (i === 0 && startWithLorem) {
          sList.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        } else {
          sList.push(generateSentence());
        }
      }
      output = sList.join(' ');
    } else {
      // Paragraphs
      const pList = [];
      for (let i = 0; i < n; i++) {
        if (i === 0 && startWithLorem) {
          pList.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
        } else {
          pList.push(generateParagraph());
        }
      }
      if (includeHtml) {
        output = pList.map(p => `<p>${p}</p>`).join('\n\n');
      } else {
        output = pList.join('\n\n');
      }
    }
    return output;
  };

  const [generatedText, setGeneratedText] = useState(() => generateText());

  const handleRegenerate = () => {
    setGeneratedText(generateText());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is Lorem Ipsum placeholder text?",
      answer: "Lorem Ipsum is standard dummy text used by designers, typesetters, and developers since the 1500s to demonstrate visual layouts without being distracted by readable content."
    },
    {
      question: "Where did Lorem Ipsum originate?",
      answer: "It originates from sections 1.10.32 and 1.10.33 of Cicero's 45 BC philosophical treatise 'De Finibus Bonorum et Malorum' (On the Extremes of Good and Evil)."
    }
  ];

  const howToUse = [
    { title: "Select Unit & Quantity", desc: "Choose whether you need paragraphs, individual sentences, or word counts." },
    { title: "Toggle HTML Tags", desc: "Optionally wrap generated paragraphs in HTML <p> tags for copy-pasting into code." },
    { title: "Generate & Copy", desc: "Regenerate unique placeholder variations or copy immediately with one click." }
  ];

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      subtitle="Generate customizable placeholder dummy text for web design, prototypes, and mockups."
      category="text"
      categoryName="Text Tools"
      icon={LuSparkles}
      badge="New"
      seoKeywords="lorem ipsum generator, dummy text, placeholder text generator, latin dummy text"
      seoDescription="Free online Lorem Ipsum generator. Create custom placeholder text by paragraphs, sentences, or word counts with optional HTML tags."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'case-converter', 'markdown-previewer']}
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Type:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              Start with "Lorem ipsum"
            </label>

            {type === 'paragraphs' && (
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHtml}
                  onChange={(e) => setIncludeHtml(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                Wrap in &lt;p&gt; tags
              </label>
            )}

            <button
              onClick={handleRegenerate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm"
            >
              <LuRotateCcw size={14} /> Regenerate
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Generated Dummy Text
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy All Text'}
            </button>
          </div>
          <textarea
            rows={10}
            readOnly
            value={generatedText}
            className="w-full p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-normal text-base leading-relaxed outline-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsumGenerator;
