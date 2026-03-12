import React, { useState, useEffect } from 'react';
import SEO from './SEO';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: 59, g: 130, b: 246 });
  const [hslInput, setHslInput] = useState({ h: 217, s: 91, l: 60 });
  const [colorHistory, setColorHistory] = useState([]);

  const presetColors = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#000000', '#6B7280', '#FFFFFF'
  ];

  useEffect(() => {
    hexToRgb(selectedColor);
    hexToHsl(selectedColor);
  }, [selectedColor]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setRgbInput({ r, g, b });
      return { r, g, b };
    }
    return null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
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
      }
    }

    setHslInput({
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    });
  };

  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      rgbToHsl(rgb.r, rgb.g, rgb.b);
    }
  };

  const handleHexChange = (value) => {
    setHexInput(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setSelectedColor(value);
      addToHistory(value);
    }
  };

  const handleRgbChange = (channel, value) => {
    const newRgb = { ...rgbInput, [channel]: parseInt(value) || 0 };
    setRgbInput(newRgb);
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setSelectedColor(hex);
    setHexInput(hex);
    addToHistory(hex);
  };

  const handleColorPickerChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    setHexInput(color);
    addToHistory(color);
  };

  const addToHistory = (color) => {
    setColorHistory(prev => [color, ...prev.filter(c => c !== color).slice(0, 19)]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const generateComplementary = () => {
    const rgb = hexToRgb(selectedColor);
    if (rgb) {
      const comp = rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
      setSelectedColor(comp);
      setHexInput(comp);
      addToHistory(comp);
    }
  };

  const generateAnalogous = () => {
    const hsl = hslInput;
    const newHue = (hsl.h + 30) % 360;
    const rgb = hslToRgb(newHue, hsl.s, hsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setSelectedColor(hex);
    setHexInput(hex);
    addToHistory(hex);
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Color Picker"
        description="Free online color picker - extract colors from images, get HEX, RGB, HSL, and HSV codes. Advanced color picker tool for designers and developers with color palette generator."
        keywords="color picker, image color picker, hex color picker, rgb color picker, hsl color picker, color extractor, color palette generator, color code generator, design tools"
        url="https://platformtools.netlify.app/color-picker"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Color <span className="text-gradient">Picker</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Pick colors from the palette or upload an image to extract specific color codes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <span className="text-white text-xl">🎨</span>
                </div>
                Color Selection
              </h2>

              {/* Image Upload Section */}
              <div className="mb-8 border-b border-gray-100 dark:border-gray-800/50 pb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Extract from Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-2xl cursor-pointer bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-10 h-10 mb-3 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                      </div>
                      <p className="mb-1 text-sm text-gray-600 dark:text-gray-400"><span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">SVG, PNG, JPG or GIF</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const img = new Image();
                            img.onload = () => {
                              const canvas = document.getElementById('imageCanvas');
                              const ctx = canvas.getContext('2d');
                              const maxWidth = 500;
                              const scale = Math.min(maxWidth / img.width, 1);
                              canvas.width = img.width * scale;
                              canvas.height = img.height * scale;
                              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            };
                            img.src = event.target.result;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-center shadow-inner relative group">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
                  <canvas
                    id="imageCanvas"
                    className="cursor-crosshair max-w-full relative z-10 rounded-xl m-2 transition-transform duration-300 group-hover:scale-[1.01]"
                    onClick={(e) => {
                      const canvas = e.target;
                      const rect = canvas.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const ctx = canvas.getContext('2d');
                      const pixel = ctx.getImageData(x, y, 1, 1).data;
                      const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1).toUpperCase();
                      setSelectedColor(hex);
                    }}
                  ></canvas>
                </div>
                <p className="text-xs text-center text-gray-500 mt-3 font-medium flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Click anywhere on the image to pick a color
                </p>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Choose Color Manually
                </label>
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={handleColorPickerChange}
                      className="w-20 h-20 opacity-0 absolute inset-0 cursor-pointer z-10"
                    />
                    <div className="w-20 h-20 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-gray-800 overflow-hidden group-hover:border-blue-500 transition-all group-active:scale-95">
                      <div 
                        className="w-16 h-16 rounded-xl shadow-inner transition-colors duration-300 flex items-center justify-center"
                        style={{ backgroundColor: selectedColor }}
                      >
                        <span className="text-2xl drop-shadow-sm filter invert brightness-200 mix-blend-difference">🖌️</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <div
                      className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="text-sm font-mono font-bold text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                      {selectedColor}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Preset Colors
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                  {presetColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setHexInput(color);
                        addToHistory(color);
                      }}
                      className="w-full aspect-square rounded-xl border border-white/20 dark:border-gray-700 hover:scale-110 hover:-translate-y-1 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={generateComplementary}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  Complementary
                </button>
                <button
                  onClick={generateAnalogous}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Analogous
                </button>
              </div>
            </div>

            {colorHistory.length > 0 && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <span className="text-white text-sm">🕒</span>
                  </div>
                  Recent Colors
                </h3>
                <div className="grid grid-cols-10 gap-2">
                  {colorHistory.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setHexInput(color);
                      }}
                      className="w-full aspect-square rounded-lg border border-gray-200 dark:border-gray-700 hover:scale-110 hover:-translate-y-1 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="text-white text-xl">📋</span>
                </div>
                Color Codes
              </h2>

              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    HEX
                  </label>
                  <div className="flex space-x-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-mono">#</span>
                      </div>
                      <input
                        type="text"
                        value={hexInput.replace('#', '')}
                        onChange={(e) => handleHexChange('#' + e.target.value.toUpperCase())}
                        className="w-full pl-8 pr-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white font-mono font-medium shadow-sm"
                        placeholder="000000"
                        maxLength="6"
                      />
                    </div>
                    <button
                      onClick={() => copyToClipboard(hexInput)}
                      className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                      title="Copy HEX"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                    RGB
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-red-500 text-right">R</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                        className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-green-500 text-right">G</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                        className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-blue-500 text-right">B</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                        className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <input
                      type="text"
                      value={`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`}
                      readOnly
                      className="flex-1 px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white font-mono font-medium shadow-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`)}
                      className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                      title="Copy RGB"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                    HSL
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-gray-500 dark:text-gray-400 text-right">H</span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={hslInput.h}
                        onChange={(e) => {
                          const newHsl = { ...hslInput, h: parseInt(e.target.value) };
                          setHslInput(newHsl);
                          const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                          setSelectedColor(hex);
                          setHexInput(hex);
                          addToHistory(hex);
                        }}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
                        }}
                      />
                      <div className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm overflow-hidden whitespace-nowrap">
                        {hslInput.h}°
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-gray-500 dark:text-gray-400 text-right">S</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hslInput.s}
                        onChange={(e) => {
                          const newHsl = { ...hslInput, s: parseInt(e.target.value) };
                          setHslInput(newHsl);
                          const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                          setSelectedColor(hex);
                          setHexInput(hex);
                          addToHistory(hex);
                        }}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, hsl(${hslInput.h}, 0%, ${hslInput.l}%), hsl(${hslInput.h}, 100%, ${hslInput.l}%))`
                        }}
                      />
                      <div className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm overflow-hidden whitespace-nowrap">
                        {hslInput.s}%
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-6 font-bold text-gray-500 dark:text-gray-400 text-right">L</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hslInput.l}
                        onChange={(e) => {
                          const newHsl = { ...hslInput, l: parseInt(e.target.value) };
                          setHslInput(newHsl);
                          const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
                          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                          setSelectedColor(hex);
                          setHexInput(hex);
                          addToHistory(hex);
                        }}
                        className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #000, hsl(${hslInput.h}, ${hslInput.s}%, 50%), #fff)`
                        }}
                      />
                      <div className="w-16 px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg text-center font-mono text-sm dark:text-white shadow-sm overflow-hidden whitespace-nowrap">
                        {hslInput.l}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <input
                      type="text"
                      value={`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`}
                      readOnly
                      className="flex-1 px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white font-mono font-medium shadow-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`)}
                      className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2"
                      title="Copy HSL"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
