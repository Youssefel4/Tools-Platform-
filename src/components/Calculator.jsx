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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20 transform rotate-6">
              <FaCalculator className="text-white text-2xl" />
            </div>
            Smart <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Advanced scientific calculator with trigonometry and logarithmic functions
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 mb-6 flex justify-center">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-semibold transition-all shadow-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {isScientific ? 'Switch to Basic' : 'Switch to Scientific'}
            </button>
          </div>

          <div className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 mb-8 text-right shadow-lg relative z-10 transition-all duration-300">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black font-mono text-gray-900 dark:text-white tracking-widest overflow-hidden whitespace-nowrap scrollbar-hide flex flex-col justify-end">
              <div className="text-sm opacity-50 font-bold mb-1 tracking-normal">{operation && previousValue !== null ? `${previousValue} ${operation}` : ''}</div>
              {display}
            </div>
          </div>

          {isScientific && (
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3 mb-6 relative z-10 animate-fade-in-up">
              {['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pow2', 'pow3', '1/x', 'pi'].map((op) => (
                <button
                  key={op}
                  onClick={() => scientificOperation(op)}
                  className="px-2 py-3 bg-indigo-50/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all font-bold text-xs uppercase tracking-wider transform hover:-translate-y-0.5 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30"
                >
                  {op === 'sqrt' ? '√' : op === 'pow2' ? 'x²' : op === 'pow3' ? 'x³' : op === 'pi' ? 'π' : op}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-3 sm:gap-4 relative z-10">
            <button
              onClick={clear}
              className="col-span-2 px-4 py-4 sm:py-5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-2xl hover:bg-red-200 dark:hover:bg-red-900/60 transition-all font-black text-xl shadow-md transform active:scale-95"
            >
              AC
            </button>
            <button
              onClick={() => performOperation('/')}
              className="px-4 py-4 sm:py-5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all font-black text-3xl shadow-md transform active:scale-95 border border-blue-100/50 dark:border-blue-800/30"
            >
              ÷
            </button>
            <button
              onClick={() => performOperation('*')}
              className="px-4 py-4 sm:py-5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all font-black text-3xl shadow-md transform active:scale-95 border border-blue-100/50 dark:border-blue-800/30"
            >
              ×
            </button>

            {[7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => inputNumber(num)}
                className="px-4 py-4 sm:py-5 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all transform active:scale-95 font-bold text-2xl border border-gray-100/50 dark:border-gray-700/50"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => performOperation('-')}
              className="px-4 py-4 sm:py-5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all font-black text-3xl shadow-md transform active:scale-95 border border-blue-100/50 dark:border-blue-800/30"
            >
              −
            </button>

            {[4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => inputNumber(num)}
                className="px-4 py-4 sm:py-5 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all transform active:scale-95 font-bold text-2xl border border-gray-100/50 dark:border-gray-700/50"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => performOperation('+')}
              className="px-4 py-4 sm:py-5 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all font-black text-3xl shadow-md transform active:scale-95 border border-blue-100/50 dark:border-blue-800/30"
            >
              +
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => inputNumber(num)}
                className="px-4 py-4 sm:py-5 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all transform active:scale-95 font-bold text-2xl border border-gray-100/50 dark:border-gray-700/50"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => performOperation('=')}
              className="row-span-2 px-4 py-4 sm:py-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-xl hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 font-black text-3xl flex items-center justify-center border border-white/20"
            >
              =
            </button>

            <button
              onClick={() => inputNumber(0)}
              className="col-span-2 px-4 py-4 sm:py-5 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all transform active:scale-95 font-bold text-2xl border border-gray-100/50 dark:border-gray-700/50"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="px-4 py-4 sm:py-5 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all transform active:scale-95 font-bold text-2xl border border-gray-100/50 dark:border-gray-700/50"
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
