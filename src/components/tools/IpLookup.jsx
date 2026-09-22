import React, { useState, useEffect } from 'react';
import { LuGlobe, LuCopy, LuCheck, LuRotateCcw, LuMonitor, LuClock } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const IpLookup = () => {
  const [ip, setIp] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [clientInfo, setClientInfo] = useState({});

  const fetchIp = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setIp(data.ip || 'Unavailable');
    } catch (e) {
      setIp('127.0.0.1 (Offline)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIp();

    // Client environmental parameters
    if (typeof window !== 'undefined') {
      setClientInfo({
        userAgent: navigator.userAgent,
        language: navigator.language || navigator.userLanguage,
        screenRes: `${window.screen.width} × ${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        colorDepth: `${window.screen.colorDepth}-bit`,
        online: navigator.onLine ? 'Connected' : 'Offline'
      });
    }
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: "What is an IP address?",
      answer: "An Internet Protocol (IP) address is a unique numerical label assigned to every device connected to a computer network that uses the Internet Protocol for communication."
    },
    {
      question: "Is my private internal network IP visible here?",
      answer: "No. This tool shows your public-facing IP address as seen by web servers on the public internet, rather than your local router subnet IP (such as 192.168.x.x)."
    }
  ];

  const howToUse = [
    { title: "Automatic Detection", desc: "Your public IP address is loaded automatically on page view." },
    { title: "One-Click Copy", desc: "Copy your IP to share with network administrators or configure firewalls." },
    { title: "Inspect Client Details", desc: "Review your browser user agent, screen resolution, and system timezone." }
  ];

  return (
    <ToolLayout
      title="What Is My IP & Network Info"
      subtitle="Instantly discover your public IP address, browser user-agent, and network details."
      category="developer"
      categoryName="Developer Tools"
      icon={LuGlobe}
      badge="Network"
      seoKeywords="what is my ip, ip lookup, my ip address, public ip, check ip online"
      seoDescription="Free online IP lookup tool. Find out what your public IP address is, inspect browser headers, screen resolution, and network timezone."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['url-encoder', 'hash-generator', 'regex-tester']}
    >
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Main IP Highlight Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider opacity-90">
            Your Public IP Address
          </span>
          <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight">
            {loading ? 'Detecting IP...' : ip}
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={copyIp}
              disabled={loading || ip === 'Unavailable'}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm font-semibold text-sm transition-all"
            >
              {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
              {copied ? 'Copied IP' : 'Copy IP Address'}
            </button>
            <button
              onClick={fetchIp}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
              title="Refresh IP"
            >
              <LuRotateCcw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Client System Details */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-200 dark:border-slate-700 pb-3">
            Client & Browser Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Timezone</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {clientInfo.timezone || '—'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Screen Resolution</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {clientInfo.screenRes || '—'} ({clientInfo.colorDepth})
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Language</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {clientInfo.language || '—'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-400 block">Network Connection</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {clientInfo.online || '—'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">User Agent Header</span>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-300 break-all leading-relaxed">
              {clientInfo.userAgent || '—'}
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default IpLookup;
