import React, { useState, useEffect } from 'react';
import { LuPalette, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copiedKey, setCopiedKey] = useState(null);

  const presetColors = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#000000', '#64748B', '#FFFFFF'
  ];

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }
    return null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateColor = (hex) => {
    setSelectedColor(hex);
    setHexInput(hex);
    const parsedRgb = hexToRgb(hex);
    if (parsedRgb) {
      setRgb(parsedRgb);
      setHsl(rgbToHsl(parsedRgb.r, parsedRgb.g, parsedRgb.b));
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const faqs = [
    {
      question: "What is the difference between HEX, RGB, and HSL?",
      answer: "HEX (#RRGGBB) is standard in CSS and HTML, RGB specifies intensity of red, green, and blue (0-255), and HSL defines Hue (0-360°), Saturation (0-100%), and Lightness (0-100%)."
    },
    {
      question: "Can I type a custom HEX code directly?",
      answer: "Yes, you can edit the HEX input field directly to convert any custom color into its corresponding RGB and HSL coordinates."
    },
    {
      question: "Is this color picker free for commercial design?",
      answer: "Yes, this color picker is 100% free with unlimited conversions, instant palette copies, and zero restrictions."
    }
  ];

  const howToUse = [
    { title: "Select or Enter Color", desc: "Use the color swatch picker or select from preset designer shades." },
    { title: "View Formats", desc: "HEX, RGB, and HSL coordinates update instantaneously." },
    { title: "Copy CSS Codes", desc: "Click Copy beside any format to paste directly into your project." }
  ];

  const features = [
    { title: "Tri-Format Support", desc: "Simultaneous HEX, RGB, and HSL values ready for CSS." },
    { title: "Designer Palette", desc: "20 modern curated swatches for rapid UI color exploration." },
    { title: "Live Swatch Preview", desc: "Generous preview tile displays color fidelity in real time." }
  ];

  return (
    <ToolLayout
      title="Online Color Picker & Hex RGB Converter"
      subtitle="Pick custom colors, extract Hex, RGB, HSL values, and browse curated palette swatches."
      category="media"
      categoryName="Media & Design"
      icon={LuPalette}
      badge="Design"
      seoDescription="Free online color picker and converter. Extract HEX, RGB, and HSL codes, test color combinations, and copy CSS color values with one click."
      seoKeywords="color picker, hex color picker, rgb color picker, hsl converter, color palette, online color tool, css color picker"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['color-palette-generator', 'color-contrast-checker', 'css-gradient-generator']}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Main Color Swatch & Native Picker */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div
            className="w-32 h-32 rounded-2xl shadow-lg border-2 border-white dark:border-slate-700 relative overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: selectedColor }}
          >
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => updateColor(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/40 text-white backdrop-blur-sm pointer-events-none">
              Click to Pick
            </span>
          </div>

          <div className="flex-1 space-y-3 w-full">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Selected Color Coordinates
            </h3>

            {/* HEX */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm">
              <span className="font-bold text-slate-800 dark:text-slate-200">{selectedColor.toUpperCase()}</span>
              <button
                onClick={() => copyToClipboard(selectedColor.toUpperCase(), 'hex')}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
              >
                {copiedKey === 'hex' ? <LuCheck size={12} /> : <LuCopy size={12} />}
                {copiedKey === 'hex' ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* RGB */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm">
              <span className="text-slate-800 dark:text-slate-200">{rgbString}</span>
              <button
                onClick={() => copyToClipboard(rgbString, 'rgb')}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
              >
                {copiedKey === 'rgb' ? <LuCheck size={12} /> : <LuCopy size={12} />}
                {copiedKey === 'rgb' ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* HSL */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm">
              <span className="text-slate-800 dark:text-slate-200">{hslString}</span>
              <button
                onClick={() => copyToClipboard(hslString, 'hsl')}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
              >
                {copiedKey === 'hsl' ? <LuCheck size={12} /> : <LuCopy size={12} />}
                {copiedKey === 'hsl' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Preset Designer Palette */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Quick Designer Color Palette
          </h4>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => updateColor(color)}
                className={`h-11 rounded-xl transition-transform hover:scale-110 border-2 shadow-sm ${
                  selectedColor.toLowerCase() === color.toLowerCase()
                    ? 'border-blue-600 scale-105'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;
