import React, { useState } from 'react';
import SEO from './SEO';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState('');

  const categories = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meter', factor: 1 },
        kilometer: { name: 'Kilometer', factor: 0.001 },
        centimeter: { name: 'Centimeter', factor: 100 },
        millimeter: { name: 'Millimeter', factor: 1000 },
        mile: { name: 'Mile', factor: 0.000621371 },
        yard: { name: 'Yard', factor: 1.09361 },
        foot: { name: 'Foot', factor: 3.28084 },
        inch: { name: 'Inch', factor: 39.3701 },
        pixel: { name: 'Pixel (96 DPI)', factor: 3779.527559 },
        point: { name: 'Point (1/72 inch)', factor: 2834.645669 },
        pica: { name: 'Pica (12 points)', factor: 236.220472 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilogram', factor: 1 },
        gram: { name: 'Gram', factor: 1000 },
        milligram: { name: 'Milligram', factor: 1000000 },
        pound: { name: 'Pound', factor: 2.20462 },
        ounce: { name: 'Ounce', factor: 35.274 },
        ton: { name: 'Ton', factor: 0.001 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius', factor: 1 },
        fahrenheit: { name: 'Fahrenheit', factor: 1 },
        kelvin: { name: 'Kelvin', factor: 1 }
      }
    }
  };

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    let convertedValue;

    if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = (value * 9 / 5) + 32;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedValue = value + 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = (value - 32) * 5 / 9;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedValue = (value - 32) * 5 / 9 + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedValue = value - 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedValue = (value - 273.15) * 9 / 5 + 32;
      } else {
        convertedValue = value;
      }
    } else {
      const fromFactor = categories[category].units[fromUnit].factor;
      const toFactor = categories[category].units[toUnit].factor;
      convertedValue = (value / fromFactor) * toFactor;
    }

    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  React.useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Unit Converter"
        description="Free online unit converter - convert between units of length, weight, temperature, volume, and area. Fast, accurate conversions for meters, feet, pounds, kilograms, Celsius, Fahrenheit, and more."
        keywords="unit converter, length converter, weight converter, temperature converter, measurement converter, metric converter, imperial converter, unit conversion tool, measurement tools"
        url="https://platformtools.netlify.app/unit-converter"
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Unit <span className="text-gradient">Converter</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Instantly convert between different units of length, weight, and temperature
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden mb-8 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="mb-8 relative z-10">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider text-center">
              Select Category
            </label>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 bg-white/40 dark:bg-gray-800/40 p-2 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    const units = Object.keys(categories[cat].units);
                    setFromUnit(units[0]);
                    setToUnit(units[1]);
                  }}
                  className={`flex-1 min-w-[30%] px-4 py-3 rounded-xl transition-all font-bold text-sm sm:text-base flex items-center justify-center gap-2 ${category === cat
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/60'
                    }`}
                >
                  {cat === 'length' && <span>📏</span>}
                  {cat === 'weight' && <span>⚖️</span>}
                  {cat === 'temperature' && <span>🌡️</span>}
                  <span className="hidden sm:inline">{categories[cat].name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center relative z-10">
            {/* From Section */}
            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm flex flex-col h-full">
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest text-center">
                From
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full px-5 py-6 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-center text-4xl font-black text-gray-900 dark:text-white mb-4 shadow-inner custom-number-input"
                placeholder="0"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-5 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-gray-200 font-bold text-lg cursor-pointer transition-colors shadow-sm appearance-none text-center"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
              >
                {Object.keys(categories[category].units).map((unit) => (
                  <option key={unit} value={unit} className="font-medium bg-white dark:bg-gray-800">
                    {categories[category].units[unit].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2 md:my-0 relative z-20">
              <button
                onClick={swapUnits}
                className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/40 transform hover:scale-110 hover:rotate-180 duration-500 border-4 border-white dark:border-gray-800 focus:outline-none"
                title="Swap Units"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* To Section */}
            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm flex flex-col h-full">
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest text-center">
                To
              </label>
              <div className="w-full px-5 py-6 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-center text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner overflow-x-auto custom-scrollbar flex items-center justify-center min-h-[100px]">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-5 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-800 dark:text-gray-200 font-bold text-lg cursor-pointer transition-colors shadow-sm appearance-none text-center"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
              >
                {Object.keys(categories[category].units).map((unit) => (
                  <option key={unit} value={unit} className="font-medium bg-white dark:bg-gray-800">
                    {categories[category].units[unit].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-white/30 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700/50 text-center relative z-10 animate-fade-in-up">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                Conversion Formula
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-xl font-medium flex flex-wrap items-center justify-center gap-2">
                <span className="font-bold">{fromValue || '0'}</span>
                <span className="text-gray-500">{categories[category].units[fromUnit].name}</span>
                <span className="text-blue-500 mx-2 font-black">=</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{result}</span>
                <span className="text-gray-500">{categories[category].units[toUnit].name}</span>
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 glass-panel rounded-3xl p-6 relative z-10 flex justify-center items-center h-48">
          <span className="text-gray-400 text-sm">Advertisement</span>
          <div className="absolute inset-0 opacity-0 pointer-events-none">
            <ins className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '100%' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
