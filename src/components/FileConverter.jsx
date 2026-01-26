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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
            <FaFileUpload className="mr-3" />
            Professional File Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Convert files locally in your browser - Secure & Fast
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Convert Your Files
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Conversion Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {conversionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setConversionType(type.id)}
                      className={`p-3 border rounded-lg transition-colors ${conversionType === type.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                    >
                      <Icon className="mx-auto mb-2" />
                      <div className="text-sm font-medium">{type.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {conversionType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select File
                </label>
                {error && (
                  <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                    <p className="text-red-800 dark:text-red-300 text-sm">⚠️ {error}</p>
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept={conversionTypes.find(t => t.id === conversionType)?.input}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <FaFileUpload className="mr-2" />
                    Choose File
                  </label>
                  {selectedFile && (
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="font-medium">{selectedFile.name}</div>
                      <div>{formatFileSize(selectedFile.size)}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedFile && conversionType && (
              <button
                onClick={convertFile}
                disabled={converting}
                className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300"
              >
                {converting ? 'Converting...' : 'Convert File'}
              </button>
            )}
          </div>
        </div>

        {convertedFiles.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Converted Files
            </h2>
            <div className="space-y-3">
              {convertedFiles.map((file) => {
                const FileIcon = getIconForType(file.type);
                return (
                  <div key={file.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <FileIcon className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)} • {file.originalName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadFile(file)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Supported Conversions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Image Formats</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Image to PNG, JPG, WebP</li>
                <li>• Processed locally for max privacy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Data Formats</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• JSON ↔ CSV conversion</li>
                <li>• Fast processing for large datasets</li>
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
