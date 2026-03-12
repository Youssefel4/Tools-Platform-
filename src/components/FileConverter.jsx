import React, { useState } from 'react';
import SEO from './SEO';
import { FaFileUpload, FaDownload, FaFileAlt, FaImage, FaFilePdf } from 'react-icons/fa';
import { supabaseHelpers, supabase } from '../config/supabase';
import { validateFileSize, validateFileType } from '../utils/validation';
import { canExecute } from '../utils/rateLimit';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionType, setConversionType] = useState('');
  const [converting, setConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [error, setError] = useState('');

  const conversionTypes = [
    { id: 'image-to-png', name: 'Image to PNG', icon: FaImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'image-to-jpg', name: 'Image to JPG', icon: FaImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'image-to-webp', name: 'Image to WebP', icon: FaImage, input: 'image/*', allowedTypes: ['image/*'] },
    { id: 'json-to-csv', name: 'JSON to CSV', icon: FaFileAlt, input: '.json', allowedTypes: ['application/json'] },
    { id: 'csv-to-json', name: 'CSV to JSON', icon: FaFileAlt, input: '.csv', allowedTypes: ['text/csv', 'application/vnd.ms-excel'] }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setError('');

    if (file) {
      // التحقق من حجم الملف (10MB كحد أقصى)
      if (!validateFileSize(file, 10)) {
        setError('حجم الملف كبير جداً. الحد الأقصى هو 10 ميجابايت');
        return;
      }

      // التحقق من نوع الملف
      const currentType = conversionTypes.find(t => t.id === conversionType);
      if (currentType && !validateFileType(file, currentType.allowedTypes)) {
        setError('نوع الملف غير مدعوم لهذا التحويل');
        return;
      }

      setSelectedFile(file);
    }
  };

  const convertFile = async () => {
    if (!selectedFile || !conversionType) return;
    setError('');

    // التحقق من Rate Limiting (2 ثانية بين كل تحويل)
    if (!canExecute('file-converter', 2000)) {
      setError('يرجى الانتظار قبل تحويل ملف آخر');
      return;
    }

    setConverting(true);

    try {
      let resultBlob = null;
      let resultExtension = '';
      let resultType = '';

      // Real Conversion Logic
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

      // Log to Supabase (Optional, fire and forget)
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
      // alert("Conversion failed. Please try a valid file.");
    } finally {
      setConverting(false);
      setSelectedFile(null);
      setConversionType('');
    }
  };

  // --- Helper Conversion Functions ---

  const convertImage = (file, format) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        // format: png, jpeg, webp
        const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas to Blob failed"));
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
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const deleteFile = (id) => {
    setConvertedFiles(convertedFiles.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconForType = (type) => {
    if (type.includes('image')) return FaImage;
    if (type.includes('pdf')) return FaFilePdf;
    return FaFileAlt;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SEO
        title="File Converter"
        description="Free online file converter - convert images (PNG, JPG, WEBP), JSON to CSV, and more file formats locally in your browser. Privacy-first file conversion with no server uploads."
        keywords="file converter, image converter, json to csv converter, file format converter, png to jpg, jpg to png, webp converter, csv converter, privacy file converter, local file conversion"
        url="https://platformtools.netlify.app/file-converter"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20 transform -rotate-6">
              <FaFileUpload className="text-white text-2xl" />
            </div>
            File <span className="text-gradient">Converter</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Convert files locally in your browser - Secure, Fast & Private
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-xl">⚙️</span>
            </div>
            Convert Your Files
          </h2>

          <div className="space-y-8 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                1. Select Conversion Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {conversionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setConversionType(type.id)}
                      className={`p-5 rounded-2xl transition-all duration-300 border ${conversionType === type.id
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/20 transform scale-[1.05] -translate-y-1'
                        : 'border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-600 dark:text-gray-400'
                        } flex flex-col items-center justify-center gap-3 active:scale-95`}
                    >
                      <div className={`p-3 rounded-xl ${conversionType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <Icon className="text-xl" />
                      </div>
                      <div className="text-xs font-black text-center uppercase tracking-tight">{type.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {conversionType && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                  2. Select File
                </label>
                {error && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-red-800 dark:text-red-300 text-sm font-medium flex items-center gap-2">
                       <span className="text-lg">⚠️</span> {error}
                    </p>
                  </div>
                )}
                <div className={`border-2 border-dashed ${selectedFile ? 'border-blue-400 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50/50 dark:bg-gray-800/50'} rounded-2xl p-8 sm:p-12 text-center transition-all duration-300`}>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept={conversionTypes.find(t => t.id === conversionType)?.input}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer inline-flex flex-col items-center justify-center w-full group"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative">
                       <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-400/10 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                       <FaFileUpload className="text-3xl text-blue-600 dark:text-blue-400 relative z-10" />
                    </div>
                    <span className="text-xl font-black text-gray-900 dark:text-white mb-2">Click to choose a file</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">or drag and drop it here</span>
                  </label>
                  
                  {selectedFile && (
                    <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in-up max-w-sm mx-auto flex items-center gap-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-500">
                        {React.createElement(getIconForType(selectedFile.type || ''), { className: "text-xl" })}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-bold text-gray-900 dark:text-white truncate">{selectedFile.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(selectedFile.size)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedFile && conversionType && (
              <div className="animate-fade-in-up mt-8">
                <button
                  onClick={convertFile}
                  disabled={converting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 font-bold text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3"
                >
                  {converting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div> Converting...</>
                  ) : (
                    <><span className="text-xl">✨</span> Convert File</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {convertedFiles.length > 0 && (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-8 relative z-10 animate-fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="text-white text-xl">✅</span>
              </div>
              Converted Files
            </h2>
            <div className="space-y-4">
              {convertedFiles.map((file) => {
                const FileIcon = getIconForType(file.type);
                return (
                  <div key={file.id} className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md">
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                        <FileIcon className="text-blue-600 dark:text-blue-400 text-xl" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 dark:text-white truncate" title={file.name}>
                          {file.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate" title={file.originalName}>
                          {formatFileSize(file.size)} • from: {file.originalName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => downloadFile(file)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 rounded-xl transition-colors font-bold text-sm flex items-center gap-2"
                      >
                        <FaDownload /> Download
                      </button>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                        title="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="glass-panel rounded-3xl p-6 sm:p-8 mt-8 relative z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-white text-xl">ℹ️</span>
            </div>
            Supported Conversions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaImage className="text-blue-500" /> Image Formats
              </h3>
              <ul className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Image to PNG, JPG, WebP</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Processed locally for max privacy</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Up to 10MB file size supported</li>
              </ul>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaFileAlt className="text-purple-500" /> Data Formats
              </h3>
              <ul className="space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> JSON to CSV conversion</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> CSV to JSON conversion</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Fast processing for datasets</li>
              </ul>
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

export default FileConverter;
