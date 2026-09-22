import React, { useState, useEffect } from 'react';
import { LuVolume2, LuPlay, LuPause, LuSquare } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to Tools Platform! Listen to your documents, articles, and notes read aloud with high quality text-to-speech voice synthesis.');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const vList = window.speechSynthesis.getVoices();
        setVoices(vList);
        if (vList.length > 0 && !selectedVoice) {
          const defaultVoice = vList.find(v => v.lang.startsWith('en')) || vList[0];
          setSelectedVoice(defaultVoice.name);
        }
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedVoice]);

  const handlePlay = () => {
    if (!('speechSynthesis' in window) || !text.trim()) return;

    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      setSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const chosen = voices.find(v => v.name === selectedVoice);
    if (chosen) utterance.voice = chosen;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    setPaused(false);
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && speaking) {
      window.speechSynthesis.pause();
      setPaused(true);
      setSpeaking(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  };

  const faqs = [
    {
      question: "How does this Text to Speech reader work?",
      answer: "It uses your browser's native Web Speech API SpeechSynthesis engine, meaning voice generation runs 100% locally on your device without sending text to external servers."
    },
    {
      question: "Can I adjust the playback speed and voice accent?",
      answer: "Yes! You can choose between all system voices installed on your operating system, and adjust speech rate (0.5x to 2x) and vocal pitch."
    }
  ];

  const howToUse = [
    { title: "Type or Paste Article", desc: "Input any text, essay, or documentation passage." },
    { title: "Select Voice & Speed", desc: "Pick your preferred voice narrator and adjust playback speed." },
    { title: "Press Play", desc: "Listen comfortably with pause, resume, and stop controls." }
  ];

  return (
    <ToolLayout
      title="Text to Speech Reader"
      subtitle="Convert written text into natural spoken audio using browser-native speech synthesis."
      category="text"
      categoryName="Text Tools"
      icon={LuVolume2}
      badge="Audio"
      seoKeywords="text to speech, tts online, read text aloud, voice synthesizer, speech synthesis"
      seoDescription="Free online Text to Speech reader. Convert text into natural voice audio with voice selection, pitch sliders, and speed controls locally."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'case-converter', 'notes']}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Text to Read Aloud
          </label>
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            placeholder="Type or paste text to hear it spoken aloud..."
          />
        </div>

        {/* Controls */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Narrator Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm outline-none"
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Speed / Rate</span>
                <span>{rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Voice Pitch</span>
                <span>{pitch}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <LuPlay size={16} /> {paused ? 'Resume' : 'Play Audio'}
            </button>
            <button
              onClick={handlePause}
              disabled={!speaking}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm disabled:opacity-50"
            >
              <LuPause size={16} /> Pause
            </button>
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm"
            >
              <LuSquare size={16} /> Stop
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextToSpeech;
