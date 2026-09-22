import React, { useState } from 'react';
import { LuMinimize2, LuCloudUpload, LuDownload, LuShieldCheck } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [originalPreview, setOriginalPreview] = useState('');
  const [compressedPreview, setCompressedPreview] = useState('');
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.7); // 70% quality
  const [isCompressing, setIsCompressing] = useState(false);

  const processImage = (file, qual) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', qual);
        setCompressedPreview(compressedDataUrl);

        // Approximate byte size from base64 length
        const stringLength = compressedDataUrl.length - 'data:image/jpeg;base64,'.length;
        const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383687;
        setCompressedSize(Math.round(sizeInBytes));
        setIsCompressing(false);
      };
      img.src = e.target.result;
      setOriginalPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (file) => {
    if (!file) return;
    setOriginalFile(file);
    setOriginalSize(file.size);
    processImage(file, quality);
  };

  const handleQualityChange = (val) => {
    const q = parseFloat(val);
    setQuality(q);
    if (originalFile) {
      processImage(originalFile, q);
    }
  };

  const handleDownload = () => {
    if (!compressedPreview) return;
    const a = document.createElement('a');
    a.href = compressedPreview;
    a.download = `compressed_${originalFile ? originalFile.name.replace(/\.[^/.]+$/, '') : 'image'}.jpg`;
    a.click();
  };

  const savedPercent = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const faqs = [
    {
      question: "How does in-browser image compression work?",
      answer: "Your browser loads the image onto an offscreen HTML5 canvas element and recompresses the pixel color data at your chosen JPEG quality level entirely locally on your device."
    },
    {
      question: "Are my photos uploaded to any third-party server?",
      answer: "No. Everything runs 100% client-side inside your browser. No files or data ever leave your computer or phone."
    }
  ];

  const howToUse = [
    { title: "Select an Image", desc: "Drag and drop any JPG, PNG, or WebP photo into the upload area." },
    { title: "Adjust Quality Slider", desc: "Slide between 10% and 100% to find your ideal balance of sharpness and file size savings." },
    { title: "Download Compressed File", desc: "Download your lightweight image ready for website or email delivery." }
  ];

  return (
    <ToolLayout
      title="Image Compressor"
      subtitle="Compress JPEG and PNG images client-side with quality sliders and real-time size reduction."
      category="developer"
      categoryName="Developer Tools"
      icon={LuMinimize2}
      badge="Media"
      seoKeywords="image compressor, compress image online, reduce image size, compress jpg, photo compressor free"
      seoDescription="Free online image compressor. Reduce image file sizes locally with customizable quality controls and instant download."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['image-resizer', 'image-base64-converter', 'qr-generator']}
      blogSlug="how-to-resize-image-without-losing-quality"
      blogTitle="How to Resize an Image Without Losing Quality (Free Online Tool)"
    >
      <div className="space-y-8">
        {/* Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center hover:border-blue-500 transition-colors"
        >
          <LuCloudUpload className="mx-auto text-blue-500 mb-3" size={44} />
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
            Drop image here to compress, or browse
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Supports PNG, JPEG, WebP • 100% Client-Side Privacy
          </p>
          <label className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
            Choose Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            />
          </label>
        </div>

        {originalFile && (
          <div className="space-y-6">
            {/* Compression Slider & Stats Bar */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Compression Quality Level</span>
                  <span>{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.95"
                  step="0.05"
                  value={quality}
                  onChange={(e) => handleQualityChange(e.target.value)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Stats Comparison */}
              <div className="grid grid-cols-3 gap-4 text-center pt-2">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">Original Size</span>
                  <span className="font-bold text-slate-900 dark:text-white text-lg sm:text-xl">
                    {formatBytes(originalSize)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-400 block">Compressed Size</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-lg sm:text-xl">
                    {formatBytes(compressedSize)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 block">Total Saved</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg sm:text-xl">
                    -{savedPercent}%
                  </span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleDownload}
                  disabled={isCompressing || !compressedPreview}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <LuDownload size={18} /> Download Compressed Image
                </button>
              </div>
            </div>

            {/* Visual Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold uppercase text-slate-400 mb-2 block">
                  Original Image
                </span>
                <img
                  src={originalPreview}
                  alt="Original"
                  className="max-h-64 mx-auto rounded-xl object-contain border border-slate-100 dark:border-slate-800"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-xs font-bold uppercase text-emerald-500 mb-2 block">
                  Compressed Preview ({Math.round(quality * 100)}% quality)
                </span>
                <img
                  src={compressedPreview}
                  alt="Compressed"
                  className="max-h-64 mx-auto rounded-xl object-contain border border-slate-100 dark:border-slate-800"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageCompressor;
