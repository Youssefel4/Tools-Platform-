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
        description="Advanced Color Picker with Image Color Extraction, HEX, RGB, and HSL support."
        keywords="color picker, image color picker, hex code, rgb code, hsl code"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Color Picker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pick colors from the palette or upload an image to extract colors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Color Selection
              </h2>

              {/* Image Upload Section */}
              <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Extract from Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
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
                              // Resize logic to fit canvas width if needed, or just draw
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
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 flex justify-center bg-gray-100 dark:bg-gray-900">
                  <canvas
                    id="imageCanvas"
                    className="cursor-crosshair max-w-full"
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
                <p className="text-xs text-center text-gray-500 mt-2">Click anywhere on the image to pick a color</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Choose Color Manually
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={handleColorPickerChange}
                    className="w-24 h-24 border-2 border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                  />
                  <div
                    className="w-24 h-24 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-inner"
                    style={{ backgroundColor: selectedColor }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preset Colors
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {presetColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setHexInput(color);
                        addToHistory(color);
                      }}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={generateComplementary}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-sm"
                >
                  Complementary
                </button>
                <button
                  onClick={generateAnalogous}
                  className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  Analogous
                </button>
              </div>
            </div>

            {colorHistory.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Colors
                </h3>
                <div className="grid grid-cols-8 gap-2">
                  {colorHistory.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setHexInput(color);
                      }}
                      className="w-10 h-10 rounded border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Color Codes
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    HEX
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                      placeholder="#000000"
                    />
                    <button
                      onClick={() => copyToClipboard(hexInput)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    RGB
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">R:</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-center dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">G:</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-center dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">B:</span>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={rgbInput.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbInput.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-center dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      value={`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgbInput.r}, ${rgbInput.g}, ${rgbInput.b})`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    HSL
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">H:</span>
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
                        className="flex-1"
                      />
                      <span className="w-12 text-center text-sm text-gray-600 dark:text-gray-400">{hslInput.h}°</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">S:</span>
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
                        className="flex-1"
                      />
                      <span className="w-12 text-center text-sm text-gray-600 dark:text-gray-400">{hslInput.s}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">L:</span>
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
                        className="flex-1"
                      />
                      <span className="w-12 text-center text-sm text-gray-600 dark:text-gray-400">{hslInput.l}%</span>
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      value={`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(`hsl(${hslInput.h}, ${hslInput.s}%, ${hslInput.l}%)`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      Copy
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
