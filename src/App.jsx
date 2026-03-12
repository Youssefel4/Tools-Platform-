import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
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

import { supabase } from './config/supabase';
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
      // Create a persistent encrypted local user ID if not exists
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Application...</p>
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
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
