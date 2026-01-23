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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
      <SEO
        title="QR Code Generator"
        description="Create free QR codes for URLs, text, WiFi, and email. Customizable colors and size."
        keywords="qr code generator, create qr code, free qr code, custom qr code"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
            <FaQrcode className="mr-2 sm:mr-3" />
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 px-2">
            Create custom QR codes for URLs, text, and more
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                QR Code Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    rows="4"
                    placeholder="Enter URL, text, or any content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size: {size}x{size}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Foreground Color
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={darkColor}
                        onChange={(e) => setDarkColor(e.target.value)}
                        className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={darkColor}
                        onChange={(e) => setDarkColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Color
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="color"
                        value={lightColor}
                        onChange={(e) => setLightColor(e.target.value)}
                        className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded cursor-pointer flex-shrink-0"
                      />
                      <input
                        type="text"
                        value={lightColor}
                        onChange={(e) => setLightColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <button
                    onClick={generateQRCode}
                    className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors min-h-[44px]"
                  >
                    Generate QR Code
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={!text}
                    className="px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-300 min-h-[44px] min-w-[44px]"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  History
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {history.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="truncate flex-1 cursor-pointer" onClick={() => loadFromHistory(item)}>
                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{item.content}</p>
                        <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteHistory(item.id)} className="text-red-500 hover:text-red-700 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h2>

              <div className="flex flex-col items-center">
                {qrCodeUrl ? (
                  <>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 w-full flex justify-center">
                      <img src={qrCodeUrl} alt="QR Code" className="max-w-full h-auto" style={{ maxWidth: '300px' }} />
                    </div>
                    <button
                      onClick={downloadQRCode}
                      className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors min-h-[44px] w-full sm:w-auto"
                    >
                      <FaDownload className="mr-2" />
                      Download QR Code
                    </button>
                  </>
                ) : (
                  <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center text-sm px-4">
                      QR Code will appear here
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Templates
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setText('https://')} className="text-xs sm:text-sm p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 min-h-[44px]">Website</button>
                <button onClick={() => setText('mailto:')} className="text-xs sm:text-sm p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 min-h-[44px]">Email</button>
                <button onClick={() => setText('tel:')} className="text-xs sm:text-sm p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 min-h-[44px]">Phone</button>
                <button onClick={() => setText('WIFI:T:WPA;S:;P:;;')} className="text-xs sm:text-sm p-2 sm:p-3 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 min-h-[44px]">WiFi</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};
export default QRCodeGenerator;
