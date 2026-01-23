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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Unit Converter"
        description="Convert easily between units of length, weight, temperature, and more."
        keywords="unit converter, length converter, weight converter, temperature converter, measurement tools"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Unit Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert between different units of length, weight, and temperature
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    const units = Object.keys(categories[cat].units);
                    setFromUnit(units[0]);
                    setToUnit(units[1]);
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${category === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  {categories[cat].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white mb-3"
                placeholder="Enter value"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.keys(categories[category].units).map((unit) => (
                  <option key={unit} value={unit}>
                    {categories[category].units[unit].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white mb-3 min-h-[42px] flex items-center">
                {result || '0'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.keys(categories[category].units).map((unit) => (
                  <option key={unit} value={unit}>
                    {categories[category].units[unit].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={swapUnits}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Swap Units
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Conversion Formula
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {fromValue} {categories[category].units[fromUnit].name} = {result} {categories[category].units[toUnit].name}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '250px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
