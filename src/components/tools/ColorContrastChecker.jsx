import React, { useState } from 'react';
import { LuEye, LuCheck, LuX, LuArrowUpDown } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const ColorContrastChecker = () => {
  const [textColor, setTextColor] = useState('#1e293b');
  const [bgColor, setBgColor] = useState('#ffffff');

  // Relative luminance calculation according to WCAG 2.1
  const getLuminance = (hex) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const transform = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    const R = transform(r);
    const G = transform(g);
    const B = transform(b);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const getContrastRatio = (hex1, hex2) => {
    try {
      const lum1 = getLuminance(hex1);
      const lum2 = getLuminance(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    } catch (e) {
      return 1;
    }
  };

  const ratio = getContrastRatio(textColor, bgColor);
  const formattedRatio = ratio.toFixed(2);

  // Criteria
  const normalAA = ratio >= 4.5;
  const normalAAA = ratio >= 7.0;
  const largeAA = ratio >= 3.0;
  const largeAAA = ratio >= 4.5;
  const uiComponentsAA = ratio >= 3.0;

  const swapColors = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  const faqs = [
    {
      question: "What is the WCAG 2.1 contrast ratio standard?",
      answer: "The Web Content Accessibility Guidelines (WCAG) 2.1 specify that normal text must have a minimum contrast ratio of 4.5:1 for Level AA, and 7:1 for enhanced Level AAA. Large text requires at least 3:1 for AA and 4.5:1 for AAA."
    },
    {
      question: "What counts as 'large text' under WCAG?",
      answer: "Large text is defined as at least 18pt (24px) normal weight, or 14pt (18.66px) bold weight."
    }
  ];

  const howToUse = [
    { title: "Select Text & Background Colors", desc: "Pick colors with the color pickers or enter hex values." },
    { title: "Review Contrast Score", desc: "Inspect the exact mathematical contrast ratio (e.g. 7.5:1)." },
    { title: "Check Accessibility Badges", desc: "Verify WCAG AA and AAA compliance for normal and large text." }
  ];

  return (
    <ToolLayout
      title="Color Contrast Checker (WCAG)"
      subtitle="Ensure web accessibility with WCAG 2.1 AA and AAA contrast ratio scores for text and background."
      category="developer"
      categoryName="Developer Tools"
      icon={LuEye}
      badge="WCAG"
      seoKeywords="color contrast checker, wcag contrast ratio, web accessibility, color contrast ratio online, accessible colors"
      seoDescription="Free online color contrast checker. Calculate WCAG 2.1 contrast ratios, check AA and AAA accessibility compliance, and preview text legibility."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['color-picker', 'color-palette-generator', 'css-gradient-generator']}
    >
      <div className="space-y-8">
        {/* Color Pickers Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Text / Foreground Color
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                {textColor.toUpperCase()}
              </span>
            </div>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Background Color
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-base">
                {bgColor.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={swapColors}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600"
                title="Swap Colors"
              >
                <LuArrowUpDown size={16} />
              </button>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Live Visual Preview */}
        <div
          style={{ backgroundColor: bgColor, color: textColor }}
          className="p-8 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-xl transition-colors space-y-3"
        >
          <div className="text-2xl sm:text-3xl font-bold">
            Large Heading Preview (24px+)
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            This is an interactive preview of regular body text rendered using your selected text and background colors. Good contrast ensures effortless legibility across diverse lighting conditions.
          </p>
        </div>

        {/* Score & WCAG Badges */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Contrast Ratio
            </span>
            <div className="text-5xl font-black text-slate-900 dark:text-white my-1">
              {formattedRatio} : 1
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            {/* Normal Text */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Normal Text</span>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level AA (4.5:1):</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${normalAA ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {normalAA ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level AAA (7.0:1):</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${normalAAA ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {normalAAA ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>

            {/* Large Text */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">Large Text</span>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level AA (3.0:1):</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${largeAA ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {largeAA ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level AAA (4.5:1):</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${largeAAA ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {largeAAA ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>

            {/* UI Components */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">UI Components</span>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Level AA (3.0:1):</span>
                <span className={`px-2 py-0.5 rounded-full font-bold ${uiComponentsAA ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {uiComponentsAA ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorContrastChecker;
