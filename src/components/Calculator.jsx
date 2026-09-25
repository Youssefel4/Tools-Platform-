import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import ToolLayout from './ToolLayout';

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
        return secondValue !== 0 ? firstValue / secondValue : 'Error';
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const scientificOperation = (op) => {
    const value = parseFloat(display);
    let result = 0;

    switch (op) {
      case 'sin':
        result = Math.sin(value * (Math.PI / 180));
        break;
      case 'cos':
        result = Math.cos(value * (Math.PI / 180));
        break;
      case 'tan':
        result = Math.tan(value * (Math.PI / 180));
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
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'pi':
        result = Math.PI;
        break;
      default:
        result = value;
    }

    setDisplay(String(Number(result.toFixed(8))));
    setWaitingForNewValue(true);
  };

  const faqs = [
    {
      question: "How do I switch to scientific mode?",
      answer: "Click the 'Switch to Scientific' button above the calculator keypad to display trigonometry (sin, cos, tan), square roots, powers, logs, and pi."
    },
    {
      question: "Are angle calculations in degrees or radians?",
      answer: "Trigonometric functions (sin, cos, tan) calculate in standard degrees for easy everyday and classroom use."
    },
    {
      question: "Is this online calculator free?",
      answer: "Yes, this scientific calculator is 100% free with unlimited calculations and zero registration required."
    }
  ];

  const howToUse = [
    { title: "Standard Math", desc: "Use the keypad for addition, subtraction, multiplication, and division." },
    { title: "Scientific Mode", desc: "Toggle Scientific mode to unlock sin, cos, tan, square roots, logs, and constants." },
    { title: "Clear & Reset", desc: "Press AC (All Clear) at any time to reset your display and calculation buffer." }
  ];

  const features = [
    { title: "Dual Mode", desc: "Easily switch between basic desktop calculator and advanced scientific layout." },
    { title: "Full Trigonometry", desc: "Instant sin, cos, tan, logarithms, square root, and powers." },
    { title: "Zero Latency", desc: "Calculates in pure client-side JavaScript with 100% privacy." }
  ];

  return (
    <ToolLayout
      title="Scientific & Standard Calculator"
      subtitle="Free online calculator with trigonometric functions, square roots, logarithms, powers, and memory operations."
      category="calculators"
      categoryName="Calculators"
      icon={FaCalculator}
      badge="Popular"
      seoDescription="Free scientific & basic online calculator. Perform precision calculations with trigonometry (sin, cos, tan), square roots, powers, and algebraic functions."
      seoKeywords="calculator, scientific calculator, online calculator, math calculator, trigonometry calculator, free calculator, standard calculator"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['percentage-calculator', 'compound-interest-calculator', 'base-converter']}
    >
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsScientific(!isScientific)}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full text-xs font-bold transition-all shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2"
          >
            {isScientific ? 'Switch to Basic' : 'Switch to Scientific'}
          </button>
        </div>

        {/* Display Screen */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6 text-right shadow-inner">
          <div className="text-xs text-slate-400 font-mono font-semibold h-4 mb-1">
            {operation && previousValue !== null ? `${previousValue} ${operation}` : ''}
          </div>
          <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
            {display}
          </div>
        </div>

        {/* Scientific Keys */}
        {isScientific && (
          <div className="grid grid-cols-5 gap-2 mb-4">
            {['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pow2', 'pow3', '1/x', 'pi'].map((op) => (
              <button
                key={op}
                onClick={() => scientificOperation(op)}
                className="py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold text-xs uppercase border border-blue-200/50 dark:border-blue-800/40 transition-colors"
              >
                {op === 'sqrt' ? '√' : op === 'pow2' ? 'x²' : op === 'pow3' ? 'x³' : op === 'pi' ? 'π' : op}
              </button>
            ))}
          </div>
        )}

        {/* Standard Keypad */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          <button
            onClick={clear}
            className="col-span-2 py-4 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-2xl hover:bg-red-200 font-extrabold text-lg transition-colors border border-red-200 dark:border-red-900/40"
          >
            AC
          </button>
          <button
            onClick={() => performOperation('/')}
            className="py-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 font-black text-2xl transition-colors border border-blue-200 dark:border-blue-900/40"
          >
            ÷
          </button>
          <button
            onClick={() => performOperation('*')}
            className="py-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 font-black text-2xl transition-colors border border-blue-200 dark:border-blue-900/40"
          >
            ×
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="py-4 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-slate-700 font-bold text-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('-')}
            className="py-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 font-black text-2xl transition-colors border border-blue-200 dark:border-blue-900/40"
          >
            −
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="py-4 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-slate-700 font-bold text-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('+')}
            className="py-4 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 font-black text-2xl transition-colors border border-blue-200 dark:border-blue-900/40"
          >
            +
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => inputNumber(num)}
              className="py-4 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-slate-700 font-bold text-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => performOperation('=')}
            className="row-span-2 py-4 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-black text-2xl shadow-lg hover:shadow-blue-500/30 flex items-center justify-center transition-all"
          >
            =
          </button>

          <button
            onClick={() => inputNumber(0)}
            className="col-span-2 py-4 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-slate-700 font-bold text-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="py-4 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl hover:bg-white dark:hover:bg-slate-700 font-bold text-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Calculator;
