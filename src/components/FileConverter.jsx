import React, { useState } from 'react';
import { LuFileCheck, LuUpload, LuDownload, LuFileText, LuImage, LuCheck } from 'react-icons/lu';
import ToolLayout from './ToolLayout';
import { supabaseHelpers, supabase } from '../config/supabase';
import { validateFileSize, validateFileType } from '../utils/validation';
import { canExecute } from '../utils/rateLimit';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionType, setConversionType] = useState('image-to-webp');
  const [converting, setConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [error, setError] = useState('');

  const conversionTypes = [
    { id: 'image-to-webp', name: 'Image to WebP', icon: LuImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'image-to-png', name: 'Image to PNG', icon: LuImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'image-to-jpg', name: 'Image to JPG', icon: LuImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'json-to-csv', name: 'JSON to CSV', icon: LuFileText, input: '.json', allowedTypes: ['application/json'] },
    { id: 'csv-to-json', name: 'CSV to JSON', icon: LuFileText, input: '.csv', allowedTypes: ['text/csv', 'application/vnd.ms-excel'] }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setError('');

    if (file) {
      if (!validateFileSize(file, 10)) {
        setError('File size too large. Maximum supported size is 10 MB.');
        return;
      }

      const currentType = conversionTypes.find(t => t.id === conversionType);
      if (currentType && !validateFileType(file, currentType.allowedTypes)) {
        setError('Unsupported file type for this conversion mode.');
        return;
      }

      setSelectedFile(file);
    }
  };

  const convertFile = async () => {
    if (!selectedFile || !conversionType) return;
    setError('');

    if (!canExecute('file-converter', 1500)) {
      setError('Please wait a moment before converting another file.');
      return;
    }

    setConverting(true);

    try {
      let resultBlob = null;
      let resultExtension = '';
      let resultType = '';

      if (conversionType.startsWith('image-to-')) {
        resultBlob = await convertImage(selectedFile, conversionType.split('-')[2]);
        resultExtension = conversionType.split('-')[2];
        resultType = `image/${resultExtension}`;
      } else if (conversionType === 'json-to-csv') {
        resultBlob = await convertJsonToCsv(selectedFile);
        resultExtension = 'csv';
        resultType = 'text/csv';
      } else if (conversionType === 'csv-to-json') {
        resultBlob = await convertCsvToJson(selectedFile);
        resultExtension = 'json';
        resultType = 'application/json';
      }

      const convertedFile = {
        id: Date.now(),
        name: `converted_${selectedFile.name.split('.')[0]}.${resultExtension}`,
        blob: resultBlob,
        type: resultType,
        size: resultBlob.size,
        originalName: selectedFile.name,
        conversionType,
        createdAt: new Date().toISOString()
      };

      setConvertedFiles([convertedFile, ...convertedFiles]);

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        supabaseHelpers.logFileConversion({
          user_id: session.user.id,
          original_name: selectedFile.name,
          converted_name: convertedFile.name,
          conversion_type: conversionType,
          size_bytes: resultBlob.size
        });
      }
    } catch (err) {
      console.error("Conversion failed:", err);
      setError("Conversion failed. Please ensure the file contents are formatted correctly.");
    } finally {
      setConverting(false);
      setSelectedFile(null);
    }
  };

  const convertImage = (file, format) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas to Blob conversion failed"));
        }, mimeType, 0.9);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const readFileText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const convertJsonToCsv = async (file) => {
    const text = await readFileText(file);
    const data = JSON.parse(text);
    const items = Array.isArray(data) ? data : [data];
    if (items.length === 0) return new Blob([''], { type: 'text/csv' });

    const keys = Object.keys(items[0]);
    const csv = [
      keys.join(','),
      ...items.map(row => keys.map(k => JSON.stringify(row[k] || '')).join(','))
    ].join('\n');

    return new Blob([csv], { type: 'text/csv' });
  };

  const convertCsvToJson = async (file) => {
    const text = await readFileText(file);
    const lines = text.split('\n');
    if (lines.length < 2) return new Blob(['[]'], { type: 'application/json' });

    const headers = lines[0].split(',').map(h => h.trim());
    const result = lines.slice(1).filter(l => l.trim()).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((h, i) => obj[h] = values[i]?.replace(/^"|"$/g, '') || null);
      return obj;
    });

    return new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      question: "What file formats can I convert?",
      answer: "You can convert between PNG, JPG, and modern WebP raster images, as well as bidirectional JSON to CSV tabular data."
    },
    {
      question: "Are my uploaded files sent to remote servers?",
      answer: "No. Conversion occurs 100% locally inside your browser memory using HTML5 Canvas and native JavaScript parsers."
    },
    {
      question: "What is the maximum allowed file size?",
      answer: "Files up to 10 MB are supported for optimal client-side browser performance."
    }
  ];

  const howToUse = [
    { title: "Select Mode", desc: "Choose your conversion task: Image to WebP/PNG/JPG or JSON ↔ CSV." },
    { title: "Upload File", desc: "Choose a file from your device up to 10 MB." },
    { title: "Download Result", desc: "Click Convert File and download your newly formatted file instantly." }
  ];

  const features = [
    { title: "Format Flexibility", desc: "Covers image modernizations and structured spreadsheet tables." },
    { title: "Privacy Guaranteed", desc: "Zero files leave your device — processing is 100% local." },
    { title: "Instant Download", desc: "Converted files are generated in-memory with direct browser download." }
  ];

  return (
    <ToolLayout
      title="Universal File & Image Converter"
      subtitle="Convert images (PNG, JPG, WebP) and data files (JSON to CSV, CSV to JSON) locally in your browser."
      category="converters"
      categoryName="Converters"
      icon={LuFileCheck}
      badge="Converter"
      seoDescription="Free online file converter. Convert PNG, JPG, WebP images and transform CSV to JSON or JSON to CSV with 100% client-side privacy."
      seoKeywords="file converter, online file converter, image converter, png to jpg, webp converter, json to csv, csv to json"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['csv-json-converter', 'image-compressor', 'image-base64-converter']}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Conversion Type Select */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Select Conversion Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {conversionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => { setConversionType(type.id); setSelectedFile(null); setError(''); }}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    conversionType === type.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="text-xs">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Box */}
        <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center">
          <LuUpload className="mx-auto text-blue-500 mb-2" size={32} />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            {selectedFile ? selectedFile.name : 'Select file to convert'}
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Maximum file size: 10 MB'}
          </p>
          <label className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl cursor-pointer transition-colors inline-block shadow-sm">
            Browse File
            <input
              type="file"
              onChange={handleFileSelect}
              accept={conversionTypes.find(t => t.id === conversionType)?.input}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-600 dark:text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Convert Button */}
        <button
          onClick={convertFile}
          disabled={!selectedFile || converting}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all disabled:opacity-40 flex items-center justify-center gap-2 text-sm"
        >
          {converting ? 'Converting file...' : 'Convert File Now'}
        </button>

        {/* Converted Files List */}
        {convertedFiles.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Converted Files Ready for Download
            </h4>
            <div className="space-y-2">
              {convertedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <div className="truncate pr-3">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[11px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    onClick={() => downloadFile(file)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors flex-shrink-0"
                  >
                    <LuDownload size={13} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default FileConverter;
