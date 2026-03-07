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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Text Counter"
        description="Free online text counter - count words, characters (with and without spaces), sentences, paragraphs, and estimate reading time. Perfect for writers, students, and content creators."
        keywords="word counter, character counter, text counter, word count, character count, reading time calculator, text analysis tool, writing tool, content analysis"
        url="https://platformtools.netlify.app/text-counter"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Text Counter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Count words, characters, sentences, and more in your text
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Enter Your Text
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyText}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={clearText}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows="12"
                placeholder="Start typing or paste your text here..."
              />
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Words</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {words}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Characters</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {characters}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">No Spaces</span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {charactersNoSpaces}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Sentences</span>
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {sentences}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Paragraphs</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {paragraphs}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Lines</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {lines}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Reading Time</span>
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {readTime} min
                  </span>
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

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Text Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {sentences > 0 ? (words / sentences).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Words/Sentence
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {words > 0 ? (characters / words).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Characters/Word
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Letters/Word
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {paragraphs > 0 ? (sentences / paragraphs).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Sentences/Paragraph
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCounter;
