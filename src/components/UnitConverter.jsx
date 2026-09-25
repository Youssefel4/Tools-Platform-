import React, { useState, useEffect } from 'react';
import { LuArrowLeftRight, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meter (m)', factor: 1 },
        kilometer: { name: 'Kilometer (km)', factor: 0.001 },
        centimeter: { name: 'Centimeter (cm)', factor: 100 },
        millimeter: { name: 'Millimeter (mm)', factor: 1000 },
        mile: { name: 'Mile (mi)', factor: 0.000621371 },
        yard: { name: 'Yard (yd)', factor: 1.09361 },
        foot: { name: 'Foot (ft)', factor: 3.28084 },
        inch: { name: 'Inch (in)', factor: 39.3701 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilogram (kg)', factor: 1 },
        gram: { name: 'Gram (g)', factor: 1000 },
        milligram: { name: 'Milligram (mg)', factor: 1000000 },
        pound: { name: 'Pound (lb)', factor: 2.20462 },
        ounce: { name: 'Ounce (oz)', factor: 35.274 },
        ton: { name: 'Metric Ton (t)', factor: 0.001 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius (°C)', factor: 1 },
        fahrenheit: { name: 'Fahrenheit (°F)', factor: 1 },
        kelvin: { name: 'Kelvin (K)', factor: 1 }
      }
    }
  };

  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setResult('');
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

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const firstUnit = Object.keys(categories[newCat].units)[0];
    const secondUnit = Object.keys(categories[newCat].units)[1] || firstUnit;
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
  };

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqs = [
    {
      question: "How do I convert meters to feet?",
      answer: "Multiply the number of meters by 3.28084. For example, 10 meters is approximately 32.81 feet."
    },
    {
      question: "How do I convert Celsius to Fahrenheit?",
      answer: "Multiply the Celsius temperature by 9/5 (or 1.8) and add 32: (°C × 9/5) + 32 = °F."
    },
    {
      question: "How do I convert kilograms to pounds?",
      answer: "Multiply kilograms by 2.20462. For example, 70 kg is approximately 154.32 lbs."
    },
    {
      question: "Is this unit converter completely free?",
      answer: "Yes, this tool is 100% free with unlimited conversions, instant precision, and no sign-up required."
    }
  ];

  const howToUse = [
    { title: "Select Category", desc: "Choose between Length, Weight, or Temperature at the top." },
    { title: "Choose Units", desc: "Select source and target units from the interactive dropdown lists." },
    { title: "Type Any Number", desc: "Results calculate dynamically as you type with high mathematical precision." }
  ];

  const features = [
    { title: "Metric & Imperial", desc: "Seamless conversions between international SI metric and US imperial measurements." },
    { title: "Instant Dynamic Calculation", desc: "Zero delay updates computed client-side in real time." },
    { title: "One-Click Swap", desc: "Invert source and target units instantly with the swap button." }
  ];

  return (
    <ToolLayout
      title="Online Unit Converter"
      subtitle="Convert between metric and imperial measurements for length, weight, and temperature instantly."
      category="converters"
      categoryName="Converters"
      icon={LuArrowLeftRight}
      badge="Popular"
      seoDescription="Free online unit converter. Fast, accurate conversions for meters, feet, inches, kilograms, pounds, Celsius, and Fahrenheit with real-time updates."
      seoKeywords="unit converter, online unit converter, metric to imperial converter, convert meters to feet, convert kg to lbs, temperature converter, measurement tool"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['base-converter', 'calculator', 'percentage-calculator']}
      blogSlug="unit-converter-guide-length-weight-temperature"
      blogTitle="Ultimate Unit Conversion Guide: Length, Weight, Temperature & More"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Category Tabs */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800/60 p-1.5 border border-slate-200 dark:border-slate-700">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm capitalize transition-all ${
                category === cat
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {categories[cat].name}
            </button>
          ))}
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* From */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              From
            </label>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter value"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(categories[category].units).map((u) => (
                <option key={u} value={u}>
                  {categories[category].units[u].name}
                </option>
              ))}
            </select>
          </div>

          {/* To */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 relative">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                To (Converted)
              </label>
              {result && (
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {copied ? <LuCheck size={12} /> : <LuCopy size={12} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
            <div className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xl font-extrabold text-blue-600 dark:text-blue-400 truncate">
              {result || '0'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(categories[category].units).map((u) => (
                <option key={u} value={u}>
                  {categories[category].units[u].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapUnits}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
          >
            <LuArrowLeftRight size={14} /> Swap Units
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
