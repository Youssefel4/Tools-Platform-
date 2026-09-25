import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Core Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Existing Tools
import Calculator from './components/Calculator';
import Notes from './components/Notes';
import UnitConverter from './components/UnitConverter';
import TextCounter from './components/TextCounter';
import PasswordGenerator from './components/PasswordGenerator';
import CountdownTimer from './components/CountdownTimer';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import QRCodeGenerator from './components/QRCodeGenerator';
import ImageResizer from './components/ImageResizer';
import FileConverter from './components/FileConverter';
import MiniGames from './components/MiniGames';

// Newly Added Tools
import PercentageCalculator from './components/tools/PercentageCalculator';
import BMICalculator from './components/tools/BMICalculator';
import MortgageCalculator from './components/tools/MortgageCalculator';
import CalorieCalculator from './components/tools/CalorieCalculator';
import AgeCalculator from './components/tools/AgeCalculator';
import DateCalculator from './components/tools/DateCalculator';
import TipCalculator from './components/tools/TipCalculator';
import CompoundInterestCalculator from './components/tools/CompoundInterestCalculator';
import GradeCalculator from './components/tools/GradeCalculator';
import SleepCalculator from './components/tools/SleepCalculator';
import TimeCalculator from './components/tools/TimeCalculator';
import CashCalculator from './components/tools/CashCalculator';
import BaseConverter from './components/tools/BaseConverter';
import RomanNumeralConverter from './components/tools/RomanNumeralConverter';
import UrlEncoder from './components/tools/UrlEncoder';
import TimestampConverter from './components/tools/TimestampConverter';
import CsvJsonConverter from './components/tools/CsvJsonConverter';
import CaseConverter from './components/tools/CaseConverter';
import MorseCodeTranslator from './components/tools/MorseCodeTranslator';
import ImageBase64Converter from './components/tools/ImageBase64Converter';
import TextReverser from './components/tools/TextReverser';
import LoremIpsumGenerator from './components/tools/LoremIpsumGenerator';
import TextToSpeech from './components/tools/TextToSpeech';
import MarkdownPreviewer from './components/tools/MarkdownPreviewer';
import TextDiffChecker from './components/tools/TextDiffChecker';
import RandomPicker from './components/tools/RandomPicker';
import RegexTester from './components/tools/RegexTester';
import JsonFormatter from './components/tools/JsonFormatter';
import HashGenerator from './components/tools/HashGenerator';
import CssGradientGenerator from './components/tools/CssGradientGenerator';
import PasswordStrengthTester from './components/tools/PasswordStrengthTester';
import ColorContrastChecker from './components/tools/ColorContrastChecker';
import ColorPaletteGenerator from './components/tools/ColorPaletteGenerator';
import ImageCompressor from './components/tools/ImageCompressor';
import IpLookup from './components/tools/IpLookup';
import PomodoroTimer from './components/tools/PomodoroTimer';
import Stopwatch from './components/tools/Stopwatch';
import TypingSpeedTest from './components/tools/TypingSpeedTest';
import DiceRoller from './components/tools/DiceRoller';

import { setEncryptedItem, getEncryptedItem } from './utils/encryption';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initSession = () => {
      let localUserId = getEncryptedItem('local_user_id');
      if (!localUserId) {
        localUserId = 'user_' + Date.now();
        setEncryptedItem('local_user_id', localUserId);
      }

      setSession({
        user: {
          id: localUserId,
          email: 'local@user.com'
        }
      });
      setInitializing(false);
    };

    initSession();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading Tools Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-grow">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Canonical /tools/... Routes */}
              <Route path="/tools/calculator" element={<Calculator />} />
              <Route path="/tools/notes" element={<Notes session={session} />} />
              <Route path="/tools/unit-converter" element={<UnitConverter />} />
              <Route path="/tools/text-counter" element={<TextCounter />} />
              <Route path="/tools/password-generator" element={<PasswordGenerator />} />
              <Route path="/tools/countdown-timer" element={<CountdownTimer />} />
              <Route path="/tools/color-picker" element={<ColorPicker />} />
              <Route path="/tools/todo-list" element={<TodoList session={session} />} />
              <Route path="/tools/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/tools/image-resizer" element={<ImageResizer />} />
              <Route path="/tools/file-converter" element={<FileConverter />} />
              <Route path="/tools/mini-games" element={<MiniGames />} />

              {/* Calculators */}
              <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
              <Route path="/tools/mortgage-calculator" element={<MortgageCalculator />} />
              <Route path="/tools/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/tools/age-calculator" element={<AgeCalculator />} />
              <Route path="/tools/date-calculator" element={<DateCalculator />} />
              <Route path="/tools/tip-calculator" element={<TipCalculator />} />
              <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
              <Route path="/tools/grade-calculator" element={<GradeCalculator />} />
              <Route path="/tools/sleep-calculator" element={<SleepCalculator />} />
              <Route path="/tools/time-calculator" element={<TimeCalculator />} />
              <Route path="/tools/cash-calculator" element={<CashCalculator />} />

              {/* Converters */}
              <Route path="/tools/base-converter" element={<BaseConverter />} />
              <Route path="/tools/roman-numeral-converter" element={<RomanNumeralConverter />} />
              <Route path="/tools/url-encoder" element={<UrlEncoder />} />
              <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
              <Route path="/tools/csv-json-converter" element={<CsvJsonConverter />} />
              <Route path="/tools/case-converter" element={<CaseConverter />} />
              <Route path="/tools/morse-code-translator" element={<MorseCodeTranslator />} />
              <Route path="/tools/image-base64-converter" element={<ImageBase64Converter />} />

              {/* Text Tools */}
              <Route path="/tools/text-reverser" element={<TextReverser />} />
              <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
              <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
              <Route path="/tools/markdown-previewer" element={<MarkdownPreviewer />} />
              <Route path="/tools/text-diff-checker" element={<TextDiffChecker />} />
              <Route path="/tools/random-picker" element={<RandomPicker />} />

              {/* Developer Tools */}
              <Route path="/tools/regex-tester" element={<RegexTester />} />
              <Route path="/tools/json-formatter" element={<JsonFormatter />} />
              <Route path="/tools/hash-generator" element={<HashGenerator />} />
              <Route path="/tools/css-gradient-generator" element={<CssGradientGenerator />} />
              <Route path="/tools/password-strength-tester" element={<PasswordStrengthTester />} />
              <Route path="/tools/color-contrast-checker" element={<ColorContrastChecker />} />
              <Route path="/tools/color-palette-generator" element={<ColorPaletteGenerator />} />
              <Route path="/tools/image-compressor" element={<ImageCompressor />} />
              <Route path="/tools/ip-lookup" element={<IpLookup />} />

              {/* Timers & Productivity */}
              <Route path="/tools/pomodoro-timer" element={<PomodoroTimer />} />
              <Route path="/tools/stopwatch" element={<Stopwatch />} />
              <Route path="/tools/typing-test" element={<TypingSpeedTest />} />
              <Route path="/tools/dice-roller" element={<DiceRoller />} />

              {/* Backward-Compatible Redirects from Legacy /:id to /tools/:id */}
              <Route path="/calculator" element={<Navigate to="/tools/calculator" replace />} />
              <Route path="/notes" element={<Navigate to="/tools/notes" replace />} />
              <Route path="/unit-converter" element={<Navigate to="/tools/unit-converter" replace />} />
              <Route path="/text-counter" element={<Navigate to="/tools/text-counter" replace />} />
              <Route path="/password-generator" element={<Navigate to="/tools/password-generator" replace />} />
              <Route path="/countdown-timer" element={<Navigate to="/tools/countdown-timer" replace />} />
              <Route path="/color-picker" element={<Navigate to="/tools/color-picker" replace />} />
              <Route path="/todo-list" element={<Navigate to="/tools/todo-list" replace />} />
              <Route path="/qr-generator" element={<Navigate to="/tools/qr-generator" replace />} />
              <Route path="/image-resizer" element={<Navigate to="/tools/image-resizer" replace />} />
              <Route path="/file-converter" element={<Navigate to="/tools/file-converter" replace />} />
              <Route path="/mini-games" element={<Navigate to="/tools/mini-games" replace />} />

              <Route path="/percentage-calculator" element={<Navigate to="/tools/percentage-calculator" replace />} />
              <Route path="/bmi-calculator" element={<Navigate to="/tools/bmi-calculator" replace />} />
              <Route path="/mortgage-calculator" element={<Navigate to="/tools/mortgage-calculator" replace />} />
              <Route path="/calorie-calculator" element={<Navigate to="/tools/calorie-calculator" replace />} />
              <Route path="/age-calculator" element={<Navigate to="/tools/age-calculator" replace />} />
              <Route path="/date-calculator" element={<Navigate to="/tools/date-calculator" replace />} />
              <Route path="/tip-calculator" element={<Navigate to="/tools/tip-calculator" replace />} />
              <Route path="/compound-interest-calculator" element={<Navigate to="/tools/compound-interest-calculator" replace />} />
              <Route path="/grade-calculator" element={<Navigate to="/tools/grade-calculator" replace />} />
              <Route path="/sleep-calculator" element={<Navigate to="/tools/sleep-calculator" replace />} />
              <Route path="/time-calculator" element={<Navigate to="/tools/time-calculator" replace />} />
              <Route path="/cash-calculator" element={<Navigate to="/tools/cash-calculator" replace />} />
              <Route path="/base-converter" element={<Navigate to="/tools/base-converter" replace />} />
              <Route path="/roman-numeral-converter" element={<Navigate to="/tools/roman-numeral-converter" replace />} />
              <Route path="/url-encoder" element={<Navigate to="/tools/url-encoder" replace />} />
              <Route path="/timestamp-converter" element={<Navigate to="/tools/timestamp-converter" replace />} />
              <Route path="/csv-json-converter" element={<Navigate to="/tools/csv-json-converter" replace />} />
              <Route path="/case-converter" element={<Navigate to="/tools/case-converter" replace />} />
              <Route path="/morse-code-translator" element={<Navigate to="/tools/morse-code-translator" replace />} />
              <Route path="/image-base64-converter" element={<Navigate to="/tools/image-base64-converter" replace />} />
              <Route path="/text-reverser" element={<Navigate to="/tools/text-reverser" replace />} />
              <Route path="/lorem-ipsum-generator" element={<Navigate to="/tools/lorem-ipsum-generator" replace />} />
              <Route path="/text-to-speech" element={<Navigate to="/tools/text-to-speech" replace />} />
              <Route path="/markdown-previewer" element={<Navigate to="/tools/markdown-previewer" replace />} />
              <Route path="/text-diff-checker" element={<Navigate to="/tools/text-diff-checker" replace />} />
              <Route path="/random-picker" element={<Navigate to="/tools/random-picker" replace />} />
              <Route path="/regex-tester" element={<Navigate to="/tools/regex-tester" replace />} />
              <Route path="/json-formatter" element={<Navigate to="/tools/json-formatter" replace />} />
              <Route path="/hash-generator" element={<Navigate to="/tools/hash-generator" replace />} />
              <Route path="/css-gradient-generator" element={<Navigate to="/tools/css-gradient-generator" replace />} />
              <Route path="/password-strength-tester" element={<Navigate to="/tools/password-strength-tester" replace />} />
              <Route path="/color-contrast-checker" element={<Navigate to="/tools/color-contrast-checker" replace />} />
              <Route path="/color-palette-generator" element={<Navigate to="/tools/color-palette-generator" replace />} />
              <Route path="/image-compressor" element={<Navigate to="/tools/image-compressor" replace />} />
              <Route path="/ip-lookup" element={<Navigate to="/tools/ip-lookup" replace />} />
              <Route path="/pomodoro-timer" element={<Navigate to="/tools/pomodoro-timer" replace />} />
              <Route path="/stopwatch" element={<Navigate to="/tools/stopwatch" replace />} />
              <Route path="/typing-test" element={<Navigate to="/tools/typing-test" replace />} />
              <Route path="/dice-roller" element={<Navigate to="/tools/dice-roller" replace />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
