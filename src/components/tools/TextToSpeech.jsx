import React, { useState, useEffect } from 'react';
import { 
  LuVolume2, LuPlay, LuPause, LuSquare, LuBookOpen, 
  LuShieldCheck, LuRotateCcw, LuCopy, LuCheck, LuClock, 
  LuFileText, LuSlidersHorizontal 
} from 'react-icons/lu';
import { Link } from 'react-router-dom';
import ToolLayout from '../ToolLayout';

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to Tools Platform! Listen to your documents, articles, and notes read aloud with high quality text-to-speech voice synthesis.');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [copied, setCopied] = useState(false);

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
    utterance.volume = volume;

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

  const handleCopy = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    handleStop();
    setText('');
  };

  // Text statistics
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const estimatedMins = Math.ceil(wordCount / (130 * rate));

  const faqs = [
    {
      question: "How does this Text to Speech reader work?",
      answer: "It uses the official W3C Web Speech API standard built natively into your browser (Chrome, Edge, Safari, Firefox). Voice synthesis occurs 100% locally on your device without transmitting text to external servers."
    },
    {
      question: "Is my text private and secure?",
      answer: "Yes, 100% private. Because audio synthesis runs locally inside your browser, no text, document content, or voice data is ever sent to or stored on any server."
    },
    {
      question: "Can I adjust the playback speed and voice accent?",
      answer: "Yes! You can choose from all voice narrators installed on your operating system, and freely adjust the narration speed (0.5x to 2.0x), vocal pitch, and volume."
    },
    {
      question: "Does it support multiple languages and accents?",
      answer: "Yes! The reader automatically detects and lists all system voices available on your device, including English (US, UK, Australia), Arabic, Spanish, French, German, and many others."
    }
  ];

  const howToUse = [
    { title: "Type or Paste Text", desc: "Enter any article, essay, notes, or documentation." },
    { title: "Select Voice & Speed", desc: "Choose your favorite narrator voice and adjust the rate slider." },
    { title: "Press Play to Listen", desc: "Control playback with Play, Pause, Resume, and Stop controls." },
    { title: "100% Private", desc: "All audio is rendered on your device with zero data tracking." }
  ];

  return (
    <ToolLayout
      title="Text to Speech Reader"
      subtitle="Listen to any text read aloud with natural voice synthesis, 100% private in your browser."
      category="text"
      categoryName="Text Tools"
      icon={LuVolume2}
      badge="Audio"
      seoKeywords="text to speech, tts online, read text aloud, voice synthesizer, speech reader, browser tts"
      seoDescription="Free online Text to Speech reader. Convert text into natural voice audio with narrator selection, speed sliders, and 100% private playback."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['text-counter', 'case-converter', 'notes']}
    >
      <div className="space-y-6">
        {/* Blog Post Promotion Card */}
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-[#804DF2]/20 dark:border-[#804DF2]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-[#804DF2] text-white font-bold">
              <LuBookOpen size={14} />
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Want to learn more? Read our in-depth guide: <strong>Text to Speech: Free Online TTS Reader (No Sign-Up)</strong>
            </span>
          </div>
          <Link
            to="/blog/free-online-text-to-speech-reader"
            className="inline-flex items-center gap-1 font-bold text-[#804DF2] dark:text-[#a782f7] hover:underline shrink-0"
          >
            Read Article &rarr;
          </Link>
        </div>

        {/* Text Input Area */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Text to Read Aloud
            </label>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1"><LuFileText size={13} /> {wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
              <span>•</span>
              <span className="flex items-center gap-1"><LuClock size={13} /> ~{estimatedMins} min listen</span>
            </div>
          </div>

          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base outline-none focus:ring-2 focus:ring-[#804DF2] leading-relaxed"
            placeholder="Type or paste text to hear it spoken aloud..."
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={handleCopy}
              disabled={!text.trim()}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#804DF2] dark:hover:text-[#a782f7] hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              {copied ? <LuCheck size={14} className="text-emerald-500" /> : <LuCopy size={14} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            <button
              onClick={handleClear}
              disabled={!text.trim()}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-40"
            >
              <LuRotateCcw size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Audio Controls Box */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Narrator Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-sm outline-none focus:ring-2 focus:ring-[#804DF2]"
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
                <span className="text-[#804DF2] dark:text-[#a782f7] font-black">{rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-[#804DF2] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Voice Pitch</span>
                <span className="text-[#804DF2] dark:text-[#a782f7] font-black">{pitch}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-[#804DF2] cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons: Play/Pause/Stop */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlay}
                disabled={!text.trim()}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#804DF2] hover:bg-[#6c3bde] text-white font-bold text-base shadow-lg shadow-[#804DF2]/25 transition-all disabled:opacity-50"
              >
                <LuPlay size={18} /> {paused ? 'Resume' : 'Play Audio'}
              </button>
              <button
                onClick={handlePause}
                disabled={!speaking}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              >
                <LuPause size={16} /> Pause
              </button>
              <button
                onClick={handleStop}
                disabled={!speaking && !paused}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40"
              >
                <LuSquare size={16} /> Stop
              </button>
            </div>

            {/* Speaking Status Pill */}
            {speaking && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-[#804DF2] dark:text-[#a782f7] text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#804DF2]"></span>
                Reading aloud...
              </div>
            )}
          </div>
        </div>

        {/* 100% Private & Legal Security Guarantee */}
        <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-slate-900 border border-[#804DF2]/20 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#804DF2] text-white flex items-center justify-center shrink-0 shadow-sm">
            <LuShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">
              100% Private In-Browser Synthesis (W3C Standard)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              This reader uses your operating system's native voice engine via standard browser APIs. Zero audio, text data, or personal documents leave your device.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextToSpeech;
