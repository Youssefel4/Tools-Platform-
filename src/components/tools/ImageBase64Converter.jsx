import React, { useState } from 'react';
import { LuImage, LuCopy, LuCheck, LuCloudUpload } from 'react-icons/lu';
import ToolLayout from '../ToolLayout';

const ImageBase64Converter = () => {
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [mimeType, setMimeType] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const copySnippet = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const htmlImgSnippet = `<img src="${base64}" alt="${fileName || 'embedded image'}" />`;
  const cssBgSnippet = `background-image: url('${base64}');`;

  const faqs = [
    {
      question: "What is an Image Base64 Data URI?",
      answer: "A Base64 Data URI embeds the binary image data directly as an ASCII string into HTML or CSS files, eliminating the need for an external HTTP request."
    },
    {
      question: "When should I use Base64 images?",
      answer: "Base64 encoding is ideal for tiny UI icons, favicons, email signatures, or single-page offline web apps where you want to minimize network roundtrips."
    }
  ];

  const howToUse = [
    { title: "Upload or Drop Image", desc: "Drag and drop any PNG, JPG, WebP, or SVG file into the upload box." },
    { title: "View Live Encoding", desc: "Instantly see the full Base64 Data URI string and image preview." },
    { title: "Copy HTML or CSS", desc: "Copy the raw Data URI, formatted <img> element, or CSS background rule." }
  ];

  return (
    <ToolLayout
      title="Image to Base64 Converter"
      subtitle="Convert PNG, JPG, and SVG images to Base64 Data URIs, HTML tags, and CSS snippets."
      category="converters"
      categoryName="Converters"
      icon={LuImage}
      badge="New"
      seoKeywords="image to base64, base64 image converter, data uri generator, base64 encode photo"
      seoDescription="Free online image to Base64 converter. Drag and drop images to generate Base64 Data URIs, CSS background snippets, and HTML img tags."
      faqs={faqs}
      howToUse={howToUse}
      relatedToolIds={['image-resizer', 'image-compressor', 'color-picker']}
    >
      <div className="space-y-6">
        {/* Upload Box */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-center hover:border-blue-500 transition-colors"
        >
          <LuCloudUpload className="mx-auto text-blue-500 mb-3" size={40} />
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
            Drag & drop your image here, or browse
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Supports PNG, JPEG, SVG, WebP, GIF (Processed 100% locally)
          </p>
          <label className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm cursor-pointer shadow-md transition-all">
            Choose Image File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          </label>
        </div>

        {base64 && (
          <div className="space-y-6">
            {/* Preview & Stats */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={base64}
                alt="Preview"
                className="w-24 h-24 object-contain rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
              />
              <div className="space-y-1 text-center sm:text-left text-sm">
                <div className="font-bold text-slate-900 dark:text-white text-base">{fileName}</div>
                <div className="text-xs text-slate-500">MIME Type: {mimeType}</div>
                <div className="text-xs text-slate-500">
                  File Size: {(fileSize / 1024).toFixed(1)} KB • Base64 Length: {base64.length.toLocaleString()} characters
                </div>
              </div>
            </div>

            {/* Snippets */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Raw Data URI
                  </span>
                  <button
                    onClick={() => copySnippet(base64, 'uri')}
                    className="text-xs font-semibold text-blue-600 flex items-center gap-1"
                  >
                    {copiedKey === 'uri' ? <LuCheck size={14} /> : <LuCopy size={14} />}
                    {copiedKey === 'uri' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  readOnly
                  value={base64}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300 outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    HTML &lt;img&gt; Element
                  </span>
                  <button
                    onClick={() => copySnippet(htmlImgSnippet, 'html')}
                    className="text-xs font-semibold text-blue-600 flex items-center gap-1"
                  >
                    {copiedKey === 'html' ? <LuCheck size={14} /> : <LuCopy size={14} />}
                    {copiedKey === 'html' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <input
                  type="text"
                  readOnly
                  value={htmlImgSnippet}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300 outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    CSS Background Rule
                  </span>
                  <button
                    onClick={() => copySnippet(cssBgSnippet, 'css')}
                    className="text-xs font-semibold text-blue-600 flex items-center gap-1"
                  >
                    {copiedKey === 'css' ? <LuCheck size={14} /> : <LuCopy size={14} />}
                    {copiedKey === 'css' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <input
                  type="text"
                  readOnly
                  value={cssBgSnippet}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageBase64Converter;
