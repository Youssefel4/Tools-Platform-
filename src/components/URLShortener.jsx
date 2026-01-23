import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import { FaLink, FaCopy, FaExternalLinkAlt, FaChartBar, FaTrash } from 'react-icons/fa';
import { supabaseHelpers, supabase } from '../config/supabase';
import { validateURL } from '../utils/validation';
import { sanitizeURL } from '../utils/sanitization';
import { canExecute } from '../utils/rateLimit';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserUrls(session.user.id);
      }
    });
  }, []);

  const loadUserUrls = async (userId) => {
    try {
      const urls = await supabaseHelpers.getUserShortUrls(userId);
      if (urls) setShortUrls(urls);
    } catch (err) {
      console.error("Error loading URLs:", err);
    }
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const shortenUrl = async () => {
    if (!originalUrl.trim()) return;
    setError('');

    // التحقق من Rate Limiting
    if (!canExecute('url-shortener', 2000)) {
      setError('يرجى الانتظار قبل إنشاء رابط آخر');
      return;
    }

    // تنقية والتحقق من الرابط
    const cleanUrl = sanitizeURL(originalUrl.trim());
    if (!validateURL(cleanUrl)) {
      setError('الرابط غير صالح. يرجى إدخال رابط يبدأ بـ http:// أو https://');
      return;
    }

    setLoading(true);

    try {
      const shortCode = generateShortCode();
      const newUrlData = await supabaseHelpers.createShortUrl(
        cleanUrl, // استخدام الرابط المنقى والمتحقق منه
        shortCode,
        session?.user?.id || null
      );

      const newUrl = {
        ...newUrlData,
        shortUrl: `${window.location.origin}/s/${shortCode}` // Use local origin for demo/redirect
      };

      setShortUrls([newUrl, ...shortUrls]);
      setOriginalUrl('');
      setOriginalUrl('');
    } catch (err) {
      console.error("Error creating short URL:", err);
      // Show actual error to user for debugging
      alert(`Failed to save to database: ${err.message}. Using temporary mock data.`);

      // Fallback for demo if DB script not run yet or policy fail
      const shortCode = generateShortCode();
      const mockUrl = {
        id: Date.now(),
        original_url: originalUrl,
        short_code: shortCode,
        shortUrl: `${window.location.origin}/s/${shortCode}`,
        clicks: 0,
        created_at: new Date().toISOString()
      };
      setShortUrls([mockUrl, ...shortUrls]);
      setOriginalUrl('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deleteShortUrl = async (id) => {
    try {
      if (session?.user?.id) {
        await supabaseHelpers.deleteShortUrl(id);
      }
      setShortUrls(shortUrls.filter(url => url.id !== id));
    } catch (err) {
      console.error("Error deleting URL:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="URL Shortener"
        description="Shorten long URLs instantly. Free link shortener with local history."
        keywords="url shortener, link shortener, shorten link, free url shortener"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
            <FaLink className="mr-3" />
            Professional URL Shortener
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, track and manage your short links {session ? 'in the cloud' : 'instantly'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Long URL
            </label>
            {error && (
              <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-red-800 dark:text-red-300 text-sm">⚠️ {error}</p>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://example.com/very-long-url..."
              />
              <button
                onClick={shortenUrl}
                disabled={loading || !originalUrl.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Stats could be real if we fetched all count, for now locally derived for session */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {shortUrls.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Links</div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {shortUrls.reduce((sum, url) => sum + (url.clicks || 0), 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</div>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                PRO
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Analytics</div>
            </div>
          </div>
        </div>

        {shortUrls.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Links
            </h2>
            <div className="space-y-4">
              {shortUrls.map((url) => {
                const fullShortUrl = url.shortUrl || `${window.location.origin}/s/${url.short_code}`;
                return (
                  <div key={url.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <div className="flex-1 mb-2 md:mb-0 overflow-hidden">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original:</div>
                        <div className="text-sm text-gray-900 dark:text-white truncate pr-4">
                          {url.original_url || url.originalUrl}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteShortUrl(url.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Short Link:</div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={fullShortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-mono text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {fullShortUrl}
                          </a>
                          <button
                            onClick={() => copyToClipboard(fullShortUrl)}
                            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                            title="Copy"
                          >
                            <FaCopy />
                          </button>
                          <a
                            href={fullShortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                            title="Open"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <FaChartBar className="mr-1" />
                          {url.clicks || 0} clicks
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {new Date(url.created_at || url.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our professional shortener stores your links securely. Share them anywhere!
          </p>
        </div>

        <div className="mt-8">
          {/* AdSense Removed */}
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
