import React, { useState } from 'react';
import SEO from './SEO';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const scientificOperation = (op) => {
    const value = parseFloat(display);
    let result;

    switch (op) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'pow2':
        result = Math.pow(value, 2);
        break;
      case 'pow3':
        result = Math.pow(value, 3);
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="Calculator"
        description="Free online calculator - basic and scientific calculator with trigonometry, logarithms, powers, and advanced math functions. Perfect for students, professionals, and everyday calculations."
        keywords="calculator, scientific calculator, online calculator, math calculator, trigonometry calculator, free calculator, basic calculator, advanced calculator, math tools"
        url="https://platformtools.netlify.app/calculator"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Basic and scientific calculator for all your mathematical needs
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <div className="mb-4 text-center">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {isScientific ? 'Basic' : 'Scientific'} Mode
            </button>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-4 text-right">
            <div className="text-2xl font-mono text-gray-900 dark:text-white">
              {display}
            </div>
          </div>

          {isScientific && (
            <div className="grid grid-cols-5 gap-2 mb-4">
              <button
                onClick={() => scientificOperation('sin')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                sin
              </button>
              <button
                onClick={() => scientificOperation('cos')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                cos
              </button>
              <button
                onClick={() => scientificOperation('tan')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                tan
              </button>
              <button
                onClick={() => scientificOperation('log')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                log
              </button>
              <button
                onClick={() => scientificOperation('ln')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                ln
              </button>
              <button
                onClick={() => scientificOperation('sqrt')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                √
              </button>
              <button
                onClick={() => scientificOperation('pow2')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                x²
              </button>
              <button
                onClick={() => scientificOperation('pow3')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                x³
              </button>
              <button
                onClick={() => scientificOperation('1/x')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                1/x
              </button>
              <button
                onClick={() => scientificOperation('pi')}
                className="col-span-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                π
              </button>
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={clear}
              className="col-span-2 px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-semibold"
            >
              Clear
            </button>
            <button
              onClick={() => performOperation('/')}
              className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
            >
              ÷
            </button>
            <button
              onClick={() => performOperation('*')}
              className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
            >
              ×
            </button>

            <button
              onClick={() => inputNumber(7)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              7
            </button>
            <button
              onClick={() => inputNumber(8)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              8
            </button>
            <button
              onClick={() => inputNumber(9)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              9
            </button>
            <button
              onClick={() => performOperation('-')}
              className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
            >
              −
            </button>

            <button
              onClick={() => inputNumber(4)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              4
            </button>
            <button
              onClick={() => inputNumber(5)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              5
            </button>
            <button
              onClick={() => inputNumber(6)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              6
            </button>
            <button
              onClick={() => performOperation('+')}
              className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-semibold"
            >
              +
            </button>

            <button
              onClick={() => inputNumber(1)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              1
            </button>
            <button
              onClick={() => inputNumber(2)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              2
            </button>
            <button
              onClick={() => inputNumber(3)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              3
            </button>
            <button
              onClick={() => performOperation('=')}
              className="row-span-2 px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors font-semibold"
            >
              =
            </button>

            <button
              onClick={() => inputNumber(0)}
              className="col-span-2 px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              .
            </button>
          </div>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
