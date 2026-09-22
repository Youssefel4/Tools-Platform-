import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    // Local Session Setup
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
              {/* Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Existing Tools */}
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/notes" element={<Notes session={session} />} />
              <Route path="/unit-converter" element={<UnitConverter />} />
              <Route path="/text-counter" element={<TextCounter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/countdown-timer" element={<CountdownTimer />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/todo-list" element={<TodoList session={session} />} />
              <Route path="/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/image-resizer" element={<ImageResizer />} />
              <Route path="/file-converter" element={<FileConverter />} />
              <Route path="/mini-games" element={<MiniGames />} />

              {/* Newly Added Calculators */}
              <Route path="/percentage-calculator" element={<PercentageCalculator />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
              <Route path="/calorie-calculator" element={<CalorieCalculator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/date-calculator" element={<DateCalculator />} />
              <Route path="/tip-calculator" element={<TipCalculator />} />
              <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
              <Route path="/grade-calculator" element={<GradeCalculator />} />
              <Route path="/sleep-calculator" element={<SleepCalculator />} />
              <Route path="/time-calculator" element={<TimeCalculator />} />
              <Route path="/cash-calculator" element={<CashCalculator />} />

              {/* Newly Added Converters */}
              <Route path="/base-converter" element={<BaseConverter />} />
              <Route path="/roman-numeral-converter" element={<RomanNumeralConverter />} />
              <Route path="/url-encoder" element={<UrlEncoder />} />
              <Route path="/timestamp-converter" element={<TimestampConverter />} />
              <Route path="/csv-json-converter" element={<CsvJsonConverter />} />
              <Route path="/case-converter" element={<CaseConverter />} />
              <Route path="/morse-code-translator" element={<MorseCodeTranslator />} />
              <Route path="/image-base64-converter" element={<ImageBase64Converter />} />

              {/* Newly Added Text Tools */}
              <Route path="/text-reverser" element={<TextReverser />} />
              <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
              <Route path="/text-to-speech" element={<TextToSpeech />} />
              <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
              <Route path="/text-diff-checker" element={<TextDiffChecker />} />
              <Route path="/random-picker" element={<RandomPicker />} />

              {/* Newly Added Developer Tools */}
              <Route path="/regex-tester" element={<RegexTester />} />
              <Route path="/json-formatter" element={<JsonFormatter />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/css-gradient-generator" element={<CssGradientGenerator />} />
              <Route path="/password-strength-tester" element={<PasswordStrengthTester />} />
              <Route path="/color-contrast-checker" element={<ColorContrastChecker />} />
              <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
              <Route path="/image-compressor" element={<ImageCompressor />} />
              <Route path="/ip-lookup" element={<IpLookup />} />

              {/* Newly Added Timers & Productivity */}
              <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
              <Route path="/stopwatch" element={<Stopwatch />} />
              <Route path="/typing-test" element={<TypingSpeedTest />} />
              <Route path="/dice-roller" element={<DiceRoller />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
