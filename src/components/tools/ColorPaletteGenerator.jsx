import React, { useState, useEffect, useCallback } from 'react';
import { LuPalette, LuLock, LuLockOpen, LuCopy, LuCheck, LuShuffle, LuLightbulb } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const ColorPaletteGenerator = () => {
  const getRandomHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [palette, setPalette] = useState([
    { hex: '#2563EB', locked: false },
    { hex: '#3B82F6', locked: false },
    { hex: '#60A5FA', locked: false },
    { hex: '#93C5FD', locked: false },
    { hex: '#1E3A8A', locked: false }
  ]);

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const rollPalette = useCallback(() => {
    setPalette(prev => prev.map(item => item.locked ? item : { ...item, hex: getRandomHex() }));
  }, []);

  // Keyboard shortcut: Spacebar to roll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        rollPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rollPalette]);

  const toggleLock = (index) => {
    setPalette(prev => prev.map((item, idx) => idx === index ? { ...item, locked: !item.locked } : item));
  };

  const copyHex = (hex, index) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCss = () => {
    const cssVars = palette.map((p, i) => `  --color-${i + 1}: ${p.hex};`).join('\n');
    const fullCss = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(fullCss);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const faqs = [
    {
      question: "How do I roll new color palettes?",
      answer: "Click the 'Roll New Palette' button or simply press the Spacebar on your keyboard. You can lock any favorite colors so they remain fixed while the others change."
    },
    {
      question: "Can I export the palette to CSS variables?",
      answer: "Yes, click 'Copy CSS Variables' to copy standard CSS root variables ready to paste directly into your stylesheet."
    }
  ];

  const howToUse = [
    { title: "Press Spacebar or Roll", desc: "Instantly generate harmonious 5-color palettes." },
    { title: "Lock Favorite Colors", desc: "Click the padlock icon on colors you want to preserve." },
    { title: "Copy HEX or CSS", desc: "Copy individual hex codes or export the full CSS variable block." }
  ];

  return (
    <ToolLayout
      title="Color Palette Generator"
      subtitle="Generate aesthetic 5-color palettes with locks, spacebar roll shortcut, and CSS export."
      category="developer"
      categoryName="Developer Tools"
      icon={LuPalette}
      badge="Design"
      seoKeywords="color palette generator, color schemes, hex colors, color harmony, palette maker"
      seoDescription="Free online color palette generator. Create harmonic 5-color schemes with spacebar roll, color locking, and CSS variable export."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['color-picker', 'color-contrast-checker', 'css-gradient-generator']}
    >
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500 font-medium">
            <LuLightbulb className="text-[#804DF2] inline mr-1" size={14} /> Press <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border font-mono font-bold text-slate-700 dark:text-slate-300">Spacebar</kbd> to roll colors
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyAllCss}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {copiedAll ? <LuCheck size={14} /> : <LuCopy size={14} />}
              {copiedAll ? 'CSS Copied!' : 'Export CSS Variables'}
            </button>
            <button
              onClick={rollPalette}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#804DF2] hover:bg-[#6c3bde] text-white text-xs font-bold shadow-sm transition-all"
            >
              <LuShuffle size={14} /> Roll Palette
            </button>
          </div>
        </div>

        {/* 5 Color Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-5 h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          {palette.map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.hex }}
              className="relative p-6 flex flex-col justify-between items-center group transition-colors duration-300"
            >
              {/* Lock Button */}
              <button
                onClick={() => toggleLock(idx)}
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm flex items-center justify-center transition-all"
                title={item.locked ? 'Unlock color' : 'Lock color'}
              >
                {item.locked ? <LuLock size={18} /> : <LuLockOpen size={18} />}
              </button>

              {/* Hex Code & Copy */}
              <button
                onClick={() => copyHex(item.hex, idx)}
                className="bg-black/40 hover:bg-black/60 text-white backdrop-blur-md px-4 py-2 rounded-2xl font-mono font-bold text-sm flex items-center gap-2 border border-white/20 shadow-lg transition-all"
                title="Copy HEX"
              >
                <span>{item.hex}</span>
                {copiedIndex === idx ? <LuCheck size={14} className="text-emerald-400" /> : <LuCopy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPaletteGenerator;
