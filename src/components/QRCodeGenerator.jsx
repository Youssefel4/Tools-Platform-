import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import { FaQrcode, FaDownload, FaCopy, FaTrash, FaClock } from 'react-icons/fa';
import { supabaseHelpers, supabase } from '../config/supabase';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(200);
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
    // Regenerate immediately
    const sizeC = item.config?.size || 200;
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="QR Code Generator"
        description="Free QR code generator - create custom QR codes for URLs, text, WiFi networks, email, phone numbers, and more. Customize colors, size, and download high-quality QR codes instantly."
        keywords="qr code generator, create qr code, free qr code, custom qr code, qr code maker, qr code creator, wifi qr code, url qr code, barcode generator"
        url="https://platformtools.netlify.app/qr-generator"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight flex items-center justify-center gap-4">
            <span className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-2xl text-blue-600 dark:text-blue-400 shadow-sm"><FaQrcode /></span>
            QR Code <span className="text-gradient">Generator</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Create custom QR codes for URLs, text, and more instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Settings Section (Left Side - 7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10 flex items-center gap-3">
                <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">⚙️</span> 
                QR Code Settings
              </h2>

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                    Content mapping
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-5 py-4 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base shadow-inner resize-none min-h-[120px]"
                    placeholder="Enter URL, text, or any content..."
                  />
                </div>

                <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                  <label className="flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                    <span>Target Size</span>
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-lg border border-blue-200 dark:border-blue-800">{size} × {size}px</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                      Foreground Color
                    </label>
                    <div className="flex space-x-3 items-center">
                      <div className="relative">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer opacity-0 absolute inset-0 z-10"
                        />
                        <div className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm" style={{backgroundColor: darkColor}}></div>
                      </div>
                      <input
                        type="text"
                        value={darkColor}
                        onChange={(e) => setDarkColor(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="bg-white/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                      Background Color
                    </label>
                    <div className="flex space-x-3 items-center">
                      <div className="relative">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer opacity-0 absolute inset-0 z-10"
                        />
                        <div className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm" style={{backgroundColor: lightColor}}></div>
                      </div>
                      <input
                        type="text"
                        value={lightColor}
                        onChange={(e) => setLightColor(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono text-sm dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={generateQRCode}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg flex justify-center items-center gap-2"
                  >
                    <span>✨</span> Generate QR Code
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={!text}
                    className="px-6 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaCopy /> <span className="sm:hidden">Copy Content</span>
                  </button>
                </div>
              </div>
            </div>

             {history.length > 0 && (
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 relative z-10">
                  <FaClock className="text-purple-500" /> Recent History
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                  {history.map(item => (
                    <div key={item.id} className="group flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 rounded-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors cursor-pointer" onClick={() => loadFromHistory(item)}>
                      <div className="truncate flex-1 pr-4">
                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.content}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteHistory(item.id); }} className="text-red-500/70 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section (Right Side - 5 cols) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl flex-grow flex flex-col">
              <div className="absolute top-0 left-0 -ml-16 -mt-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 relative z-10 flex items-center gap-3">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl text-emerald-600 dark:text-emerald-400">👁️</span> 
                Preview View
              </h2>

              <div className="flex flex-col items-center justify-center flex-grow relative z-10 space-y-8">
                {qrCodeUrl ? (
                  <>
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-transform hover:scale-105 duration-300 relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 blur-xl -z-10"></div>
                      <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto max-w-[250px] sm:max-w-[300px] object-contain rounded-xl" />
                    </div>
                    <button
                      onClick={downloadQRCode}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg flex items-center justify-center gap-3"
                    >
                      <FaDownload /> Download Image
                    </button>
                  </>
                ) : (
                  <div className="w-full max-w-[300px] aspect-square bg-gray-100/50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-8 text-center space-y-4 shadow-inner">
                    <FaQrcode className="text-6xl opacity-20" />
                    <p className="font-medium">Configure settings and click generate to see your QR Code</p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10 flex items-center gap-2">
                <span>⚡</span> Quick Templates
              </h2>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button onClick={() => setText('https://')} className="p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700/50 font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:shadow text-left flex items-center gap-2"><span className="text-xl">🔗</span> Website</button>
                <button onClick={() => setText('mailto:')} className="p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700/50 font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:shadow text-left flex items-center gap-2"><span className="text-xl">📧</span> Email</button>
                <button onClick={() => setText('tel:')} className="p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700/50 font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:shadow text-left flex items-center gap-2"><span className="text-xl">📞</span> Phone</button>
                <button onClick={() => setText('WIFI:T:WPA;S:;P:;;')} className="p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700 transition-all border border-gray-100 dark:border-gray-700/50 font-medium text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:shadow text-left flex items-center gap-2"><span className="text-xl">📶</span> WiFi</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};
export default QRCodeGenerator;
