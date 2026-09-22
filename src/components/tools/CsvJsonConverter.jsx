import React, { useState } from 'react';
import { LuFileSpreadsheet, LuCopy, LuCheck, LuDownload, LuArrowUpDown } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const CsvJsonConverter = () => {
  const sampleCsv = `id,name,role,email
1,Alice Johnson,Designer,alice@example.com
2,Bob Smith,Developer,bob@example.com
3,Carol White,Manager,carol@example.com`;

  const [mode, setMode] = useState('csv2json'); // 'csv2json' or 'json2csv'
  const [input, setInput] = useState(sampleCsv);
  const [delimiter, setDelimiter] = useState(',');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // Conversion logic
  const convertCsvToJson = (csvStr, delim) => {
    try {
      const lines = csvStr.trim().split('\n').filter(l => l.trim().length > 0);
      if (lines.length < 2) return '[]';
      const headers = lines[0].split(delim).map(h => h.trim().replace(/^["']|["']$/g, ''));
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(delim).map(v => v.trim().replace(/^["']|["']$/g, ''));
        const obj = {};
        headers.forEach((h, index) => {
          obj[h] = values[index] !== undefined ? values[index] : '';
        });
        result.push(obj);
      }
      return JSON.stringify(result, null, 2);
    } catch (e) {
      return '';
    }
  };

  const convertJsonToCsv = (jsonStr, delim) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!Array.isArray(parsed) || parsed.length === 0) return '';
      const headers = Object.keys(parsed[0]);
      const csvRows = [];
      csvRows.push(headers.join(delim));

      parsed.forEach(item => {
        const row = headers.map(h => {
          let val = item[h] !== undefined ? String(item[h]) : '';
          if (val.includes(delim) || val.includes('\n') || val.includes('"')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        });
        csvRows.push(row.join(delim));
      });
      return csvRows.join('\n');
    } catch (e) {
      return '';
    }
  };

  const output = mode === 'csv2json'
    ? convertCsvToJson(input, delimiter)
    : convertJsonToCsv(input, delimiter);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = mode === 'csv2json' ? 'json' : 'csv';
    const mime = mode === 'csv2json' ? 'application/json' : 'text/csv';
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setMode(mode === 'csv2json' ? 'json2csv' : 'csv2json');
    }
  };

  const faqs = [
    {
      question: "How does CSV to JSON conversion work?",
      answer: "The first line of the CSV is parsed as object keys (headers), and each subsequent row becomes an individual JavaScript JSON object in an array."
    },
    {
      question: "Can this tool handle custom delimiters like semicolons or tabs?",
      answer: "Yes, you can choose between comma (,), semicolon (;), or tab (TSV) delimiters to match European spreadsheet formats or tab-separated tables."
    }
  ];

  const howToUse = [
    { title: "Select Conversion Direction", desc: "Choose between CSV to JSON or JSON to CSV." },
    { title: "Paste Your Data", desc: "Paste raw spreadsheet CSV rows or a JSON array of objects." },
    { title: "Copy or Download", desc: "Instantly copy formatted results or download data directly as a .json or .csv file." }
  ];

  return (
    <ToolLayout
      title="CSV to JSON Converter"
      subtitle="Fast bidirectional converter between CSV spreadsheets and formatted JSON data arrays."
      category="converters"
      categoryName="Converters"
      icon={LuFileSpreadsheet}
      badge="New"
      seoKeywords="csv to json, json to csv, csv parser, convert csv online, json converter"
      seoDescription="Free online CSV to JSON and JSON to CSV converter. Parse spreadsheets, handle custom delimiters, and export JSON data with instant download."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['json-formatter', 'base-converter', 'file-converter']}
    >
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="inline-flex p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => { setMode('csv2json'); setInput(sampleCsv); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'csv2json'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              CSV to JSON
            </button>
            <button
              onClick={() => {
                setMode('json2csv');
                setInput(convertCsvToJson(sampleCsv, delimiter));
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                mode === 'json2csv'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              JSON to CSV
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-500">Delimiter:</span>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="	">Tab (TSV)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwap}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Swap input & output"
            >
              <LuArrowUpDown size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <LuDownload size={14} /> Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Input {mode === 'csv2json' ? 'CSV Data' : 'JSON Array'}
            </label>
            <textarea
              rows={12}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={mode === 'csv2json' ? 'name,email,role...' : '[{"name":"Alice"}]...'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Converted Output
              </label>
              <button
                onClick={handleCopy}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea
              rows={12}
              readOnly
              value={output}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-mono text-xs sm:text-sm outline-none cursor-text"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CsvJsonConverter;
