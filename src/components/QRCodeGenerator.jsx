import React, { useState, useEffect } from 'react';
import { FaQrcode, FaDownload, FaCopy, FaTrash, FaClock } from 'react-icons/fa';
import ToolLayout from './ToolLayout';
import { supabaseHelpers, supabase } from '../config/supabase';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(250);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        loadHistory(session.user.id);
      }
    });
  }, []);

  const loadHistory = async (userId) => {
    try {
      const codes = await supabaseHelpers.getUserQRCodes(userId);
      if (codes) setHistory(codes);
    } catch (err) {
      console.error("Failed to load QR history:", err);
    }
  };

  const generateQRCode = async () => {
    if (!text.trim()) return;

    const config = { size, darkColor, lightColor };
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${darkColor.replace('#', '')}&bgcolor=${lightColor.replace('#', '')}`;
    setQrCodeUrl(qrApiUrl);

    // Save to history if logged in
    if (session?.user?.id) {
      try {
        const newQR = await supabaseHelpers.saveQRCode(text, config, session.user.id);
        setHistory([newQR, ...history]);
      } catch (err) {
        console.error("Error saving QR:", err);
      }
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const loadFromHistory = (item) => {
    setText(item.content);
    if (item.config) {
      if (item.config.size) setSize(item.config.size);
      if (item.config.darkColor) setDarkColor(item.config.darkColor);
      if (item.config.lightColor) setLightColor(item.config.lightColor);
    }
    const sizeC = item.config?.size || 250;
    const dark = item.config?.darkColor || '#000000';
    const light = item.config?.lightColor || '#FFFFFF';
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeC}x${sizeC}&data=${encodeURIComponent(item.content)}&color=${dark.replace('#', '')}&bgcolor=${light.replace('#', '')}`;
    setQrCodeUrl(url);
  };

  const deleteHistory = async (id) => {
    try {
      if (session?.user?.id) {
        await supabaseHelpers.deleteQRCode(id);
      }
      setHistory(history.filter(h => h.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const faqs = [
    {
      question: "Do these generated QR codes ever expire?",
      answer: "No. These standard static QR codes store the text or URL directly within the black-and-white pixel pattern, meaning they will work permanently without relying on external redirection servers."
    },
    {
      question: "Can I create a QR code for my Wi-Fi network?",
      answer: "Yes! Click the WiFi quick template button, fill in your network SSID and password, and scanning phones will connect automatically without typing passwords."
    },
    {
      question: "What is the recommended size for printing QR codes?",
      answer: "For business cards and flyers, we recommend at least 2cm x 2cm (or 300x300 pixels). For posters and storefront signs, generate at 600px or larger."
    },
    {
      question: "Is there any limit to how many QR codes I can create?",
      answer: "No, you can generate unlimited QR codes for personal and commercial projects completely free of charge."
    }
  ];

  const howToUse = [
    { title: "Enter Content or URL", desc: "Paste your website link, text message, Wi-Fi credentials, or email address into the input field." },
    { title: "Customize Appearance", desc: "Pick custom foreground and background colors and select your preferred pixel resolution." },
    { title: "Download High-Res PNG", desc: "Click Download Image to save your high-resolution, print-ready QR code instantly." }
  ];

  const features = [
    { title: "Permanent & Static", desc: "Standard static QR codes embed data directly into pixels and never expire." },
    { title: "Print-Ready Resolution", desc: "Crisp vector-sharp output suitable for print, flyers, business cards, and menus." },
    { title: "100% Free & Private", desc: "Generate unlimited QR codes without subscriptions, sign-ups, or watermarks." }
  ];

  return (
    <ToolLayout
      title="Free QR Code Generator Online"
      subtitle="Create custom QR codes for URLs, Wi-Fi networks, text, contact info, and phone numbers in seconds."
      category="developer"
      categoryName="Developer Tools"
      icon={FaQrcode}
      badge="Popular"
      seoDescription="Free online QR code generator. Create custom high-resolution QR codes for websites, links, Wi-Fi networks, and contact info with zero expiration."
      seoKeywords="qr code generator, create qr code, free qr generator, qr code maker, custom qr code, wifi qr code, url qr code"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['url-encoder', 'image-resizer', 'password-generator']}
      blogSlug="free-qr-code-generator-online-guide"
      blogTitle="Free QR Code Generator: How to Create Custom QR Codes for Links & Wi-Fi"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Section (Left Side - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400">⚙️</span>
              QR Code Content & Style
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Text or URL
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all text-sm resize-none min-h-[100px]"
                  placeholder="Enter URL, text, or any content..."
                />
              </div>

              {/* Quick Templates */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Quick Templates
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button onClick={() => setText('https://')} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
                    <span>🔗</span> Link
                  </button>
                  <button onClick={() => setText('mailto:')} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
                    <span>📧</span> Email
                  </button>
                  <button onClick={() => setText('tel:')} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
                    <span>📞</span> Phone
                  </button>
                  <button onClick={() => setText('WIFI:T:WPA;S:MyNetwork;P:MyPassword;;')} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
                    <span>📶</span> WiFi
                  </button>
                </div>
              </div>

              {/* Size Slider */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Pixel Size
                  </label>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {size} × {size} px
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="600"
                  step="25"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Foreground Color
                  </label>
                  <div className="flex space-x-2 items-center">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600"
                    />
                    <input
                      type="text"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs dark:text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Background Color
                  </label>
                  <div className="flex space-x-2 items-center">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600"
                    />
                    <input
                      type="text"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={generateQRCode}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all text-base flex justify-center items-center gap-2"
                >
                  <span>✨</span> Generate QR Code
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!text}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                >
                  <FaCopy /> Copy
                </button>
              </div>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <FaClock className="text-blue-500" /> Recent QR Codes
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {history.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-xl hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="truncate flex-1 pr-3">
                      <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{item.content}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteHistory(item.id); }}
                      className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Section (Right Side - 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex-grow flex flex-col items-center justify-center text-center">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">
              Live QR Preview
            </h4>

            {qrCodeUrl ? (
              <div className="space-y-6 flex flex-col items-center">
                <div className="p-5 bg-white rounded-2xl shadow-xl border border-slate-200 max-w-[260px]">
                  <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto object-contain rounded-lg" />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <FaDownload /> Download Image
                </button>
              </div>
            ) : (
              <div className="w-full max-w-[240px] aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-6 space-y-3">
                <FaQrcode className="text-5xl opacity-20" />
                <p className="text-xs font-medium">Type your content and click Generate to view your QR Code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default QRCodeGenerator;
