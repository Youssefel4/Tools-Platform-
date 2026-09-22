import React, { useState } from 'react';
import { LuPalette, LuCopy, LuCheck, LuRotateCcw } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CssGradientGenerator = () => {
  const [gradientType, setGradientType] = useState('linear'); // 'linear' or 'radial'
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [color3, setColor3] = useState('#ec4899');
  const [useThreeColors, setUseThreeColors] = useState(true);
  const [copied, setCopied] = useState(false);

  const presets = [
    { name: 'Ocean Blue', c1: '#2563eb', c2: '#06b6d4', c3: '#3b82f6', angle: 135 },
    { name: 'Sunset Glow', c1: '#f97316', c2: '#ec4899', c3: '#8b5cf6', angle: 45 },
    { name: 'Emerald Isle', c1: '#059669', c2: '#10b981', c3: '#34d399', angle: 90 },
    { name: 'Cyberpunk', c1: '#8b5cf6', c2: '#ec4899', c3: '#f43f5e', angle: 120 },
    { name: 'Dark Velvet', c1: '#1e1b4b', c2: '#312e81', c3: '#4338ca', angle: 180 },
    { name: 'Golden Hour', c1: '#f59e0b', c2: '#d97706', c3: '#b45309', angle: 60 }
  ];

  const applyPreset = (p) => {
    setColor1(p.c1);
    setColor2(p.c2);
    setColor3(p.c3);
    setAngle(p.angle);
  };

  const getCssString = () => {
    if (gradientType === 'linear') {
      const colors = useThreeColors ? `${color1}, ${color2}, ${color3}` : `${color1}, ${color2}`;
      return `background: linear-gradient(${angle}deg, ${colors});`;
    } else {
      const colors = useThreeColors ? `${color1}, ${color2}, ${color3}` : `${color1}, ${color2}`;
      return `background: radial-gradient(circle, ${colors});`;
    }
  };

  const cssCode = getCssString();

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is the difference between linear and radial CSS gradients?",
      answer: "A linear gradient transitions colors progressively along a straight directional axis (defined by an angle in degrees), while a radial gradient radiates outward from a central circular or elliptical point."
    },
    {
      question: "Are these CSS gradients compatible with all modern browsers?",
      answer: "Yes, standard CSS3 linear-gradient and radial-gradient are universally supported across Chrome, Safari, Edge, Firefox, iOS, and Android browsers."
    }
  ];

  const howToUse = [
    { title: "Select Gradient Style", desc: "Choose between Linear or Radial gradient patterns." },
    { title: "Adjust Angle & Color Stops", desc: "Rotate the angle slider and customize your colors." },
    { title: "Copy Clean CSS Code", desc: "Click copy to grab the production-ready CSS rule." }
  ];

  return (
    <ToolLayout
      title="CSS Gradient Generator"
      subtitle="Visual CSS linear and radial gradient designer with angle controls and ready-to-use code."
      category="developer"
      categoryName="Developer Tools"
      icon={LuPalette}
      badge="Popular"
      seoKeywords="css gradient generator, css gradients, linear gradient, radial gradient, gradient maker"
      seoDescription="Free online CSS gradient generator. Design linear and radial gradients with interactive angle sliders, color pickers, and instant CSS copy."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['color-palette-generator', 'color-contrast-checker', 'color-picker']}
    >
      <div className="space-y-8">
        {/* Presets Row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Presets:</span>
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Live Visual Canvas Preview */}
        <div
          style={{
            background: gradientType === 'linear'
              ? `linear-gradient(${angle}deg, ${color1}, ${color2}${useThreeColors ? `, ${color3}` : ''})`
              : `radial-gradient(circle, ${color1}, ${color2}${useThreeColors ? `, ${color3}` : ''})`
          }}
          className="h-56 sm:h-72 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center p-6 text-white font-bold text-xl drop-shadow"
        >
          <span className="bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide border border-white/20">
            {gradientType === 'linear' ? `${angle}° Linear Gradient` : 'Radial Circle Gradient'}
          </span>
        </div>

        {/* Controls Grid */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setGradientType('linear')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  gradientType === 'linear' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  gradientType === 'radial' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Radial
              </button>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
              <input
                type="checkbox"
                checked={useThreeColors}
                onChange={(e) => setUseThreeColors(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              3 Colors Gradient
            </label>
          </div>

          {/* Angle Slider (if Linear) */}
          {gradientType === 'linear' && (
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Gradient Direction Angle</span>
                <span>{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          )}

          {/* Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Color 1</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="font-mono text-xs font-bold">{color1.toUpperCase()}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Color 2</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="font-mono text-xs font-bold">{color2.toUpperCase()}</span>
              </div>
            </div>

            {useThreeColors && (
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Color 3</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <span className="font-mono text-xs font-bold">{color3.toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CSS Code Output */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm flex items-center justify-between gap-4">
          <code className="text-blue-400 break-all">{cssCode}</code>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all flex-shrink-0"
          >
            {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
            {copied ? 'Copied' : 'Copy CSS'}
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CssGradientGenerator;
