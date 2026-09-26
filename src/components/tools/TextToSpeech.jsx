import React, { useState, useEffect } from 'react';
import { LuVolume2, LuPlay, LuPause, LuSquare, LuDownload, LuLoader, LuCheck, LuBookOpen } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import ToolLayout from '../ToolLayout';

// Convert Web Audio PCM buffers into standard 16-bit WAV binary format
function audioBuffersToWav(channels, sampleRate) {
  const numChannels = channels.length;
  const numSamples = channels[0].length;
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const buffer = new ArrayBuffer(44 + numSamples * numChannels * 2);
  const view = new DataView(buffer);

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + numSamples * numChannels * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(view, 36, 'data');
  view.setUint32(40, numSamples * numChannels * 2, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channels[channel][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  return buffer;
}

// Split text into natural chunks <= 180 chars for seamless audio synthesis
function splitTextIntoChunks(text, maxLen = 180) {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const chunks = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxLen) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) chunks.push(current);
      current = word;
      while (current.length > maxLen) {
        chunks.push(current.slice(0, maxLen));
        current = current.slice(maxLen);
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

const TextToSpeech = () => {
  const [text, setText] = useState('Welcome to Tools Platform! Listen to your documents, articles, and notes read aloud with high quality text-to-speech voice synthesis.');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Detect language from text or selected voice
  const detectLangCode = () => {
    const isArabic = /[\u0600-\u06FF]/.test(text);
    if (isArabic) return 'ar';

    const chosen = voices.find(v => v.name === selectedVoice);
    if (chosen && chosen.lang) {
      const code = chosen.lang.split('-')[0].toLowerCase();
      if (code) return code;
    }
    return 'en';
  };

  const handleDownloadVoice = async () => {
    if (!text.trim() || downloading) return;

    setDownloading(true);
    setDownloadSuccess(false);
    setErrorMessage('');
    setDownloadProgress('Starting audio conversion...');

    try {
      const lang = detectLangCode();
      const chunks = splitTextIntoChunks(text, 180);

      if (chunks.length === 0) {
        throw new Error('No text to synthesize.');
      }

      // If single chunk, download directly as MP3
      if (chunks.length === 1) {
        setDownloadProgress('Generating audio file...');
        const ttsUrl = `/api/tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(chunks[0])}`;
        const res = await fetch(ttsUrl);

        if (!res.ok) {
          throw new Error('Audio generation server error');
        }

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
          throw new Error('Audio service temporarily unavailable. Please try again.');
        }

        const blob = await res.blob();
        if (blob.size < 100) {
          throw new Error('Generated audio file was invalid. Please try again.');
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voice-${Date.now()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Multi-chunk: fetch each audio segment and concatenate using AudioContext
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
          throw new Error('AudioContext not supported in this browser.');
        }

        const ctx = new AudioCtx();
        const decodedBuffers = [];

        for (let i = 0; i < chunks.length; i++) {
          setDownloadProgress(`Synthesizing segment ${i + 1} of ${chunks.length}...`);
          const ttsUrl = `/api/tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(chunks[i])}`;
          const res = await fetch(ttsUrl);

          if (!res.ok) {
            throw new Error(`Failed to fetch audio segment ${i + 1}`);
          }

          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            throw new Error(`Audio segment ${i + 1} service unavailable. Please try again.`);
          }

          const arrayBuf = await res.arrayBuffer();
          const audioBuf = await ctx.decodeAudioData(arrayBuf);
          decodedBuffers.push(audioBuf);
        }

        setDownloadProgress('Merging audio segments...');
        // Calculate total length & channels
        const totalSamples = decodedBuffers.reduce((acc, b) => acc + b.length, 0);
        const sampleRate = decodedBuffers[0].sampleRate;
        const numberOfChannels = decodedBuffers[0].numberOfChannels;

        const mergedChannels = [];
        for (let ch = 0; ch < numberOfChannels; ch++) {
          const channelData = new Float32Array(totalSamples);
          let offset = 0;
          for (const buf of decodedBuffers) {
            channelData.set(buf.getChannelData(ch), offset);
            offset += buf.length;
          }
          mergedChannels.push(channelData);
        }

        // Encode to WAV
        const wavBuffer = audioBuffersToWav(mergedChannels, sampleRate);
        const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

        const url = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voice-${Date.now()}.wav`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download voice error:', err);
      setErrorMessage(err.message || 'Audio generation failed. Please check your connection and try again.');
      setTimeout(() => setErrorMessage(''), 6000);
    } finally {
      setDownloading(false);
      setDownloadProgress('');
    }
  };

  const faqs = [
    {
      question: "How does this Text to Speech reader work?",
      answer: "It uses your browser's native Web Speech API SpeechSynthesis engine, meaning voice generation runs 100% locally on your device without sending text to external servers."
    },
    {
      question: "Can I download the generated voice audio file?",
      answer: "Yes! Click the 'Download voice' button next to the playback controls to export and save your spoken narration audio directly to your device."
    },
    {
      question: "Can I adjust the playback speed and voice accent?",
      answer: "Yes! You can choose between all system voices installed on your operating system, and adjust speech rate (0.5x to 2x) and vocal pitch."
    },
    {
      question: "Does it support Arabic text to speech?",
      answer: "Yes, both Arabic playback and audio downloads are supported. You can select an Arabic voice from the dropdown or paste Arabic text directly."
    }
  ];

  const howToUse = [
    { title: "Type or Paste Article", desc: "Input any text, essay, or documentation passage." },
    { title: "Select Voice & Speed", desc: "Pick your preferred voice narrator and adjust playback speed." },
    { title: "Press Play", desc: "Listen comfortably with pause, resume, and stop controls." },
    { title: "Download Voice", desc: "Export and save your spoken narration audio file directly to your device." }
  ];

  return (
    <ToolLayout
      title="Text to Speech Reader"
      subtitle="Convert written text into natural spoken audio using browser-native speech synthesis."
      category="text"
      categoryName="Text Tools"
      icon={LuVolume2}
      badge="Audio"
      seoKeywords="text to speech, tts online, read text aloud, voice synthesizer, download voice audio"
      seoDescription="Free online Text to Speech reader. Convert text into natural voice audio with voice selection, pitch sliders, and audio downloads."
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
            className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            Read Article &rarr;
          </Link>
        </div>

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

          {/* Action Buttons: Play/Pause/Stop on left, Download voice on right */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
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

            {/* Download Voice Button (Right Side, as in screenshot) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadVoice}
                disabled={downloading || !text.trim()}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 ${
                  downloadSuccess
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {downloading ? (
                  <>
                    <LuLoader size={16} className="animate-spin" />
                    <span>{downloadProgress || 'Preparing audio...'}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <LuCheck size={16} />
                    <span>Audio Downloaded!</span>
                  </>
                ) : (
                  <>
                    <LuDownload size={16} />
                    <span>Download voice</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Status / Error Toast Notice */}
          {errorMessage && (
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextToSpeech;
