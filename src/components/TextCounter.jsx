import React, { useState } from 'react';
import SEO from './SEO';

const TextCounter = () => {
  const [text, setText] = useState('');

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const countCharacters = (text) => {
    return text.length;
  };

  const countCharactersNoSpaces = (text) => {
    return text.replace(/\s/g, '').length;
  };

  const countSentences = (text) => {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  };

  const countParagraphs = (text) => {
    return text.split(/\n\n+/).filter(paragraph => paragraph.trim().length > 0).length;
  };

  const countLines = (text) => {
    return text.split('\n').length;
  };

  const readingTime = (text) => {
    const words = countWords(text);
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const clearText = () => {
    setText('');
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const words = countWords(text);
  const characters = countCharacters(text);
  const charactersNoSpaces = countCharactersNoSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const readTime = readingTime(text);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Text Counter"
        description="Free online text counter - count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators."
        keywords="word counter, character counter, text counter, word count, character count, reading time calculator, text analysis tool, writing tool, content analysis"
        url="https://platformtools.netlify.app/text-counter"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Text <span className="text-gradient">Counter</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Count words, characters, sentences, and more in your text instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden h-full shadow-xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative z-10 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">✍️</span> Enter Your Text
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={copyText}
                    disabled={!text}
                    className="px-5 py-2.5 bg-white/60 hover:bg-white dark:bg-gray-800/60 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>📋</span> Copy
                  </button>
                  <button
                    onClick={clearText}
                    disabled={!text}
                    className="px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold rounded-xl border border-red-100 dark:border-red-800/50 shadow-sm transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>🗑️</span> Clear
                  </button>
                </div>
              </div>

              <div className="relative z-10">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base shadow-inner resize-none custom-scrollbar"
                  rows="14"
                  placeholder="Start typing or paste your text here..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="glass-panel rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mr-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
                <span className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400">📊</span> 
                Statistics
              </h2>
              
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Words</span>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-xl">
                    {words}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Characters</span>
                  <span className="text-2xl font-black text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-xl">
                    {characters}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">No Spaces</span>
                  <span className="text-2xl font-black text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-xl">
                    {charactersNoSpaces}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Sentences</span>
                  <span className="text-2xl font-black text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-3 py-1 rounded-xl">
                    {sentences}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Paragraphs</span>
                  <span className="text-2xl font-black text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-3 py-1 rounded-xl">
                    {paragraphs}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Lines</span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-3 py-1 rounded-xl">
                    {lines}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Reading Time</span>
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400 px-3 py-1">
                    ~{readTime} min
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 glass-panel rounded-3xl p-6 relative z-10 flex justify-center items-center h-48">
              <span className="text-gray-400 text-sm">Advertisement</span>
              <div className="absolute inset-0 opacity-0 pointer-events-none">
                <ins className="adsbygoogle"
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="XXXXXXXXXX"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 relative z-10 flex items-center gap-2">
            <span className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl text-orange-600 dark:text-orange-400">🔍</span>
            Text Analysis Detailed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-3">
                {sentences > 0 ? (words / sentences).toFixed(1) : 0}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg Words / Sentence
              </div>
            </div>
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-3">
                {words > 0 ? (characters / words).toFixed(1) : 0}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg Characters / Word
              </div>
            </div>
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-3">
                {words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg Letters / Word
              </div>
            </div>
            <div className="text-center p-6 bg-white/40 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-3">
                {paragraphs > 0 ? (sentences / paragraphs).toFixed(1) : 0}
              </div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg Sentences / Paragraph
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCounter;
