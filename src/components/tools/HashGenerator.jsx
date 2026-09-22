import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { LuFingerprint, LuCopy, LuCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const HashGenerator = () => {
  const [input, setInput] = useState('Hello World');
  const [uppercase, setUppercase] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const formatHash = (hashObj) => {
    const str = hashObj.toString();
    return uppercase ? str.toUpperCase() : str.toLowerCase();
  };

  const md5Hash = input ? formatHash(CryptoJS.MD5(input)) : '';
  const sha1Hash = input ? formatHash(CryptoJS.SHA1(input)) : '';
  const sha256Hash = input ? formatHash(CryptoJS.SHA256(input)) : '';
  const sha512Hash = input ? formatHash(CryptoJS.SHA512(input)) : '';

  const hashes = [
    { name: 'MD5 (128-bit)', hash: md5Hash, bits: '128 bits' },
    { name: 'SHA-1 (160-bit)', hash: sha1Hash, bits: '160 bits' },
    { name: 'SHA-256 (256-bit)', hash: sha256Hash, bits: '256 bits' },
    { name: 'SHA-512 (512-bit)', hash: sha512Hash, bits: '512 bits' }
  ];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const faqs = [
    {
      question: "What is a cryptographic hash function?",
      answer: "A hash function is a one-way mathematical algorithm that maps arbitrary-length input data to a fixed-size string of characters. A tiny change in input results in a drastically different hash."
    },
    {
      question: "Which hash algorithm should I use for security?",
      answer: "SHA-256 and SHA-512 are current cryptographic industry standards. Older algorithms like MD5 and SHA-1 should not be used for security-critical applications due to known collision vulnerabilities."
    }
  ];

  const howToUse = [
    { title: "Type or Paste Input", desc: "Enter text, passwords, or tokens in the input field." },
    { title: "Inspect Instant Hashes", desc: "All cryptographic algorithms compute in real-time." },
    { title: "Copy Desired Hash", desc: "Copy any hash digest directly with a single click." }
  ];

  return (
    <ToolLayout
      title="Hash Generator"
      subtitle="Generate cryptographic hash digests in real-time: MD5, SHA-1, SHA-256, and SHA-512."
      category="developer"
      categoryName="Developer Tools"
      icon={LuFingerprint}
      badge="Security"
      seoKeywords="hash generator, sha256 generator, md5 online, sha512 hash, cryptographic hash online"
      seoDescription="Free online cryptographic hash generator. Compute MD5, SHA-1, SHA-256, and SHA-512 hashes in real-time with one-click copying."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['password-generator', 'password-strength-tester', 'base-converter']}
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Input String / Text
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              UPPERCASE Hex
            </label>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type text to generate hashes..."
          />
        </div>

        {/* Hashes List */}
        <div className="space-y-4">
          {hashes.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="text-slate-400 font-mono">{item.bits}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={item.hash}
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 outline-none"
                />
                <button
                  onClick={() => handleCopy(item.hash, item.name)}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors flex-shrink-0"
                  title="Copy Hash"
                >
                  {copiedKey === item.name ? <LuCheck size={16} className="text-emerald-500" /> : <LuCopy size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
